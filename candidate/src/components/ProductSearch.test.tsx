import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProductSearch } from "./ProductSearch";

afterEach(() => vi.useRealTimers());

describe("ProductSearch starter", () => {
  it("searches by product name through the async API", async () => {
    vi.useFakeTimers();
    render(<ProductSearch />);
    fireEvent.change(screen.getByLabelText("Product name"), { target: { value: "lamp" } });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(screen.getByRole("status").textContent).toBe("Loading latest search…");
    await act(async () => { await vi.advanceTimersByTimeAsync(700); });
    expect(screen.getByRole("heading", { name: "Reading lamp" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Wireless headphones" })).toBeNull();
    expect(screen.getByRole("status").textContent).toBe("Ready");
  });

  it("shows a recoverable request failure", async () => {
    vi.useFakeTimers();
    render(<ProductSearch />);
    fireEvent.click(screen.getByLabelText("Simulate failed requests"));
    fireEvent.click(screen.getByRole("button", { name: "Fast request" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(300); });
    expect(screen.getByRole("alert").textContent).toBe("Search failed. Please try again.");
    fireEvent.click(screen.getByLabelText("Simulate failed requests"));
    fireEvent.click(screen.getByRole("button", { name: "Fast request" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(300); });
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
