import { useState, type FormEvent } from "react";
import { formatPrice, products, searchProducts, type Product } from "../data/products";
import { useLatestAsync } from "../hooks/useLatestAsync";

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>(() => products.map((p) => ({ ...p })));
  const [error, setError] = useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const { run, loading } = useLatestAsync(searchProducts);

  async function search(delayMs: number) {
    setError(null);
    try {
      const nextResults = await run(query, { delayMs, fail: simulateFailure });
      if (nextResults !== undefined) setResults(nextResults);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong.");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void search(700);
  }

  return (
    <section className="panel" aria-labelledby="search-heading">
      <h2 id="search-heading">Search products</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="query">Product name</label>
        <div className="search-row">
          <input
            id="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try lamp, home, or headphones"
          />
          <button type="submit">Search</button>
        </div>
      </form>

      <fieldset className="request-controls">
        <legend>Request controls</legend>
        <p>Search for lamp with Slow request, then immediately search for mug with Fast request. Observe the results after both finish.</p>
        <div className="button-row">
          <button type="button" onClick={() => void search(300)}>Fast request</button>
          <button type="button" onClick={() => void search(3000)}>Slow request</button>
        </div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(event) => setSimulateFailure(event.target.checked)}
          />
          Simulate failed requests
        </label>
      </fieldset>

      <p role="status" aria-live="polite" className="status">
        {loading ? "Loading latest search…" : "Ready"}
      </p>
      {error && <p role="alert" className="error">{error}</p>}
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
