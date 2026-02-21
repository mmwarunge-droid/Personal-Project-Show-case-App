import { useProductsContext } from "../context/ProductsContext";

const LOCATIONS = ["Location 1", "Location 2", "Location 3", "Location 4"];

export default function LocationFilter() {
  const { selectedLocations, setSelectedLocations } = useProductsContext();

  function toggle(loc) {
    setSelectedLocations((prev) => {
      const next = new Set(prev);
      if (next.has(loc)) next.delete(loc);
      else next.add(loc);
      return next;
    });
  }

  return (
    <div className="filters">
      {LOCATIONS.map((loc) => (
        <label key={loc} className="checkboxRow">
          <input
            type="checkbox"
            checked={selectedLocations.has(loc)}
            onChange={() => toggle(loc)}
          />
          <span>{loc}</span>
        </label>
      ))}
    </div>
  );
}