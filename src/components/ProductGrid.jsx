import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onSelect }) {
  return (
    <section className="grid" aria-label="Product grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onSelect={onSelect} />
      ))}
    </section>
  );
}