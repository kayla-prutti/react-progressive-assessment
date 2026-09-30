import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProductSearch } from "./ProductSearch";

afterEach(() => vi.useRealTimers());

describe("ProductSearch starter", () => {
  it("searches immediately as the user types without a Search button", async () => {
    vi.useFakeTimers();
    render(<ProductSearch />);
    fireEvent.change(screen.getByLabelText("Product name"), {
      target: { value: "lamp" },
    });
    expect(screen.queryByRole("button", { name: "Search" })).toBeNull();
    expect(screen.getByRole("status").textContent).toBe(
      "Loading latest search…"
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(screen.getByRole("heading", { name: "Reading lamp" })).toBeTruthy();
    expect(
      screen.queryByRole("heading", { name: "Wireless headphones" })
    ).toBeNull();
    expect(screen.getByRole("status").textContent).toBe("Ready");
  });

  it("shows a recoverable request failure", async () => {
    vi.useFakeTimers();
    render(<ProductSearch />);
    fireEvent.click(screen.getByLabelText("Simulate failed requests"));
    fireEvent.click(screen.getByRole("button", { name: "Fast request" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(screen.getByRole("alert").textContent).toBe(
      "Search failed. Please try again."
    );
    fireEvent.click(screen.getByLabelText("Simulate failed requests"));
    fireEvent.click(screen.getByRole("button", { name: "Fast request" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("keeps results for the full query after an older partial query finishes", async () => {
    vi.useFakeTimers();
    render(<ProductSearch />);
    for (const query of ["m", "mu", "mug"]) {
      fireEvent.change(screen.getByLabelText("Product name"), {
        target: { value: query },
      });
    }
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(screen.getByRole("heading", { name: "Ceramic mug" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Reading lamp" })).toBeNull();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2200);
    });
    expect(screen.getByRole("heading", { name: "Ceramic mug" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Reading lamp" })).toBeNull();
    expect(screen.getByLabelText("Product name").getAttribute("value")).toBe("mug");
  });

  it("reloads all products when the user clears the query", async () => {
    vi.useFakeTimers();
    render(<ProductSearch />);
    fireEvent.change(screen.getByLabelText("Product name"), {
      target: { value: "lamp" },
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(screen.queryByRole("heading", { name: "Wireless headphones" })).toBeNull();
    fireEvent.change(screen.getByLabelText("Product name"), {
      target: { value: "" },
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    expect(screen.getByRole("heading", { name: "Wireless headphones" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Reading lamp" })).toBeTruthy();
  });
});
