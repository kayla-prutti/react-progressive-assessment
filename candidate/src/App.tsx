import { ProductSearch } from "./components/ProductSearch";

export function App() {
  return (
    <main>
      <header>
        <p className="eyebrow">React coding assessment</p>
        <h1>Product finder</h1>
        <p>Search a small catalog and inspect how asynchronous requests behave.</p>
      </header>
      <ProductSearch />
    </main>
  );
}
