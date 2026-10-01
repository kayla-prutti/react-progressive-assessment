import { useState } from "react";
import { AddProduct } from "./components/AddProduct";
import { ProductSearch } from "./components/ProductSearch";
import { products, type Product } from "./data/products";

export function App() {
  const [catalog, setCatalog] = useState<Product[]>(() =>
    products.map((product) => ({ ...product }))
  );

  function handleAddProduct(product: Omit<Product, "id">) {
    // TODO STAGE 3: assign a unique ID and add the product using setCatalog.
    // Update the array immutably. The search already receives this catalog.
  }

  return (
    <main>
      <header>
        <p className="eyebrow">React coding assessment</p>
        <h1>Product finder</h1>
        <p>Find something for your desk, home, or bookshelf.</p>
      </header>
      {/* STAGE 3: implement the imported component and handler above. */}
      <AddProduct onAdd={handleAddProduct} />
      {/* A successful addition resets the search so the new product is visible. */}
      <ProductSearch key={catalog.length} catalog={catalog} />
    </main>
  );
}
