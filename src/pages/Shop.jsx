import SearchBar from "../components/SearchBar";
import LocationFilter from "../components/LocationFilter";
import ProductGrid from "../components/ProductGrid";
import { useProductsContext } from "../context/ProductsContext";

/**
 * Shop page:
 * - GET products (via custom hook in context)
 * - Search filtering
 * - Location checkbox filtering
 */
export default function Shop() {
  const { products, loading, error, searchTerm, selectedLocations } = useProductsContext();

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filtered = products
    .filter((p) => {
      // Search by name (you can expand to origin/description if desired)
      if (!normalizedSearch) return true;
      return (p.name ?? "").toLowerCase().includes(normalizedSearch);
    })
    .filter((p) => {
      // If no locations selected, show all
      if (selectedLocations.size === 0) return true;
      return selectedLocations.has(p.location);
    });

  return (
    <div className="shopLayout">
      <aside className="sidebar">
        <SearchBar />
        <LocationFilter />
      </aside>

      <section className="content">
        {loading ? <p className="status">Loading…</p> : null}
        {error ? <p className="status error">{error}</p> : null}

        {!loading && !error ? (
          <ProductGrid products={filtered} />
        ) : null}
      </section>
    </div>
  );
}