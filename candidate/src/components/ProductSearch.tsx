import { useState, type ChangeEvent } from "react";
import { formatPrice, products, searchProducts, type Product } from "../data/products";
import { useLatestAsync } from "../hooks/useLatestAsync";

// STAGE 2 — Extend this component (15 minutes).
// Add category state, a labeled selector, and a result count.
// Both typing and category changes should search with current filter values.
// STAGE 3 is in AddProduct.tsx and App.tsx; catalog updates are passed in here.
interface ProductSearchProps {
  catalog?: readonly Product[];
}

export function ProductSearch({ catalog = products }: ProductSearchProps = {}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>(() => catalog.map((p) => ({ ...p })));
  const [error, setError] = useState<string | null>(null);
  const { run, loading } = useLatestAsync(searchProducts);

  async function search(searchQuery: string) {
    setError(null);
    try {
      // STAGE 2: pass the selected category using the API's category option.
      const nextResults = await run(searchQuery, { catalog });
      if (nextResults !== undefined) setResults(nextResults);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    }
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    void search(nextQuery);
  }

  return (
    <section className="panel" aria-labelledby="search-heading">
      <h2 id="search-heading">Search products</h2>
      <div>
        <label htmlFor="query">Product name</label>
        <div className="search-row">
          <input
            id="query"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search products…"
            aria-describedby="search-hint"
          />
        </div>
        {/* STAGE 2: add the labeled category selector here. */}
        <p id="search-hint">Results update as you type.</p>
      </div>

      <p role="status" aria-live="polite" className="status">
        {loading ? "Loading latest search…" : "Ready"}
      </p>
      {error && <p role="alert" className="error">{error}</p>}
      {/* STAGE 2: show the number of search results here. */}
      <ul className="products" aria-label="Search results">
        {results.map((product) => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
            </div>
            <span>{formatPrice(product.price)}</span>
          </li>
        ))}
      </ul>
      {results.length === 0 && <p>No products found. Try another product name.</p>}
    </section>
  );
}
