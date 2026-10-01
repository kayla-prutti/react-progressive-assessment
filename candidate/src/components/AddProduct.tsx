import type { Product } from "../data/products";

interface AddProductProps {
  onAdd: (product: Omit<Product, "id">) => void;
}

// STAGE 3 — Add a product (20 minutes).
// Implement a form with labeled name, category, and price inputs and an Add button.
// Validate a nonempty name and a positive price, then call onAdd with the values.
// Clear the form after a successful submission. No new styling is required.
// Complete handleAddProduct in App.tsx to add the product to catalog state.
export function AddProduct({ onAdd }: AddProductProps) {
  // TODO STAGE 3: add form state and a submit handler here.
  return (
    <section className="panel" aria-labelledby="add-product-heading">
      <h2 id="add-product-heading">Add a product</h2>
      {/* TODO STAGE 3: replace this placeholder with your form. */}
      <p>Stage 3: implement the add-product form here.</p>
    </section>
  );
}
