import { ProductSearch } from "./components/ProductSearch";

export function App() {
  // STAGE 3 — Build saved products (20 minutes).
  // Keep saved state and save/remove callbacks here; avoid duplicate products.
  // Pass data/callbacks to ProductSearch and the new SavedProducts component.
  // Saved products must remain saved when search results change.
  return (
    <main>
      <header>
        <p className="eyebrow">React coding assessment</p>
        <h1>Product finder</h1>
        <p>Find something for your desk, home, or bookshelf.</p>
      </header>
      <ProductSearch />
      {/* STAGE 3: render your SavedProducts component here. */}
    </main>
  );
}
