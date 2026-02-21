import { createContext, useContext, useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const productsApi = useProducts();

  // Global UI state: search + location filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState(new Set());

  const value = useMemo(() => {
    return {
      ...productsApi,
      searchTerm,
      setSearchTerm,
      selectedLocations,
      setSelectedLocations,
    };
  }, [productsApi, searchTerm, selectedLocations]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProductsContext must be used within ProductsProvider");
  return ctx;
}