import { ProductSearch } from "./components/ProductSearch";

export function App() {
  return (
    <main>
      <header>
        <p className="eyebrow">React coding assessment</p>
        <h1>Product finder</h1>
        <p>Find something for your desk, home, or bookshelf.</p>
      </header>
      <ProductSearch />
    </main>
  );
}
