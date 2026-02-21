export default function ProductCard({ product, onSelect }) {
  return (
    <button className="card" onClick={() => onSelect?.(product)} type="button">
      <h3 className="cardTitle">{product.name}</h3>
      <p className="cardText">{product.description}</p>
      <p className="cardText">Origin: {product.origin}</p>
      <p className="cardText">Price: {product.price}</p>
    </button>
  );
}