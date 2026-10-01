export type Category = "electronics" | "home" | "books";
export type CategoryFilter = Category | "all";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
}

export const products: readonly Product[] = [
  { id: "p1", name: "Wireless headphones", category: "electronics", price: 89 },
  { id: "p2", name: "Desk speaker", category: "electronics", price: 49 },
  { id: "p3", name: "USB charging hub", category: "electronics", price: 35 },
  { id: "p4", name: "Reading lamp", category: "home", price: 42 },
  { id: "p5", name: "Ceramic mug", category: "home", price: 18 },
  { id: "p6", name: "Cotton throw", category: "home", price: 64 },
  { id: "p7", name: "Practical TypeScript", category: "books", price: 32 },
  { id: "p8", name: "Designing interfaces", category: "books", price: 28 },
  { id: "p9", name: "The home garden", category: "books", price: 24 },
];

export interface SearchOptions {
  // STAGE 3: supply the current catalog from React state when searching.
  catalog?: readonly Product[];
  category?: CategoryFilter;
  delayMs?: number;
  fail?: boolean;
}

export async function searchProducts(
  query: string,
  {
    category = "all",
    catalog = products,
    // Short queries take longer, so rapid typing produces out-of-order responses.
    delayMs = query.trim().length === 1 ? 2500 : 300,
    fail = false,
  }: SearchOptions = {},
): Promise<Product[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
  if (fail) throw new Error("Search failed. Please try again.");

  const text = query.trim().toLowerCase();
  return catalog
    .filter((product) =>
      product.name.toLowerCase().includes(text) &&
      (category === "all" || product.category === category),
    )
    .map((product) => ({ ...product }));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
