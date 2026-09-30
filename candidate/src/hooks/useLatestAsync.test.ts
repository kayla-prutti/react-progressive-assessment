import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLatestAsync } from "./useLatestAsync";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

describe("useLatestAsync", () => {
  it("starts idle, sets loading, and returns the resolved value", async () => {
    const request = deferred<string>();
    const { result } = renderHook(() => useLatestAsync(() => request.promise));
    expect(result.current.loading).toBe(false);
    let pending!: Promise<string>;
    act(() => { pending = result.current.run(); });
    expect(result.current.loading).toBe(true);
    await act(async () => {
      request.resolve("done");
      expect(await pending).toBe("done");
    });
    expect(result.current.loading).toBe(false);
  });

  it("keeps loading while the latest request is pending after an older request resolves", async () => {
    const older = deferred<string>();
    const latest = deferred<string>();
    const { result } = renderHook(() => useLatestAsync((id: string) => id === "older" ? older.promise : latest.promise));
    let olderRun!: Promise<string>;
    let latestRun!: Promise<string>;
    act(() => {
      olderRun = result.current.run("older");
      latestRun = result.current.run("latest");
    });
    await act(async () => {
      older.resolve("older value");
      expect(await olderRun).toBe("older value");
    });
    const loadingAfterOlderSettles = result.current.loading;
    await act(async () => { latest.resolve("latest value"); await latestRun; });
    expect(loadingAfterOlderSettles).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it("keeps loading while the latest request is pending after an older request rejects", async () => {
    const older = deferred<string>();
    const latest = deferred<string>();
    const failure = new Error("older failed");
    const { result } = renderHook(() => useLatestAsync((id: string) => id === "older" ? older.promise : latest.promise));
    let olderError!: Promise<unknown>;
    let latestRun!: Promise<string>;
    act(() => {
      olderError = result.current.run("older").catch((error: unknown) => error);
      latestRun = result.current.run("latest");
    });
    await act(async () => { older.reject(failure); expect(await olderError).toBe(failure); });
    const loadingAfterOlderSettles = result.current.loading;
    await act(async () => { latest.resolve("done"); await latestRun; });
    expect(loadingAfterOlderSettles).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it("stops loading when the latest finishes even if an older request remains pending", async () => {
    const older = deferred<string>();
    const latest = deferred<string>();
    const { result } = renderHook(() => useLatestAsync((id: string) => id === "older" ? older.promise : latest.promise));
    let olderRun!: Promise<string>;
    let latestRun!: Promise<string>;
    act(() => { olderRun = result.current.run("older"); latestRun = result.current.run("latest"); });
    await act(async () => { latest.resolve("new"); expect(await latestRun).toBe("new"); });
    expect(result.current.loading).toBe(false);
    await act(async () => { older.resolve("old"); expect(await olderRun).toBe("old"); });
    expect(result.current.loading).toBe(false);
  });

  it("stops loading and propagates the latest error", async () => {
    const request = deferred<string>();
    const failure = new Error("search failed");
    const { result } = renderHook(() => useLatestAsync(() => request.promise));
    let observedError!: Promise<unknown>;
    act(() => { observedError = result.current.run().catch((error: unknown) => error); });
    expect(result.current.loading).toBe(true);
    await act(async () => { request.reject(failure); expect(await observedError).toBe(failure); });
    expect(result.current.loading).toBe(false);
  });

  it("passes arguments through and uses the current async function after a rerender", async () => {
    const first = async (name: string, count: number) => `${name}:${count}`;
    const second = async (name: string, count: number) => `${name}:${count * 2}`;
    const { result, rerender } = renderHook(({ fn }) => useLatestAsync(fn), { initialProps: { fn: first } });
    await act(async () => { expect(await result.current.run("item", 3)).toBe("item:3"); });
    rerender({ fn: second });
    await act(async () => { expect(await result.current.run("item", 3)).toBe("item:6"); });
  });
});
