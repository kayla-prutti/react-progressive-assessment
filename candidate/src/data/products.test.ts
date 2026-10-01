import { afterEach, describe, expect, it, vi } from "vitest";
import { searchProducts, type Product } from "./products";

afterEach(() => vi.useRealTimers());

describe("searchProducts catalog support", () => {
  it("combines the query and category using the supplied catalog", async () => {
    vi.useFakeTimers();
    const homePlant: Product = {
      id: "new-1", name: "Desk plant", category: "home", price: 12,
    };
    const catalog: Product[] = [
      homePlant,
      { id: "new-2", name: "Plant care guide", category: "books", price: 24 },
      { id: "new-3", name: "Glass vase", category: "home", price: 20 },
    ];
    const request = searchProducts("plant", { catalog, category: "home" });
    await vi.advanceTimersByTimeAsync(300);
    const results = await request;
    expect(results).toEqual([homePlant]);
    expect(catalog).toHaveLength(3);
    results[0].name = "Changed result";
    expect(homePlant.name).toBe("Desk plant");
  });
});
