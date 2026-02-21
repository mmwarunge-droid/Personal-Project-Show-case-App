import { useEffect, useRef } from "react";
import { useProductsContext } from "../context/ProductsContext";

/**
 * useRef used to focus search input on Shop mount.
 */
export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useProductsContext();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="searchWrap">
      <input
        ref={inputRef}
        className="searchInput"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}