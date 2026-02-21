import { useCallback, useEffect, useState } from "react";

const API_BASE = "http://localhost:8001";
const PRODUCTS_URL = `${API_BASE}/products`;

/**
 * Custom hook encapsulating product CRUD + loading/error.
 * Keeps components clean and makes logic testable.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(PRODUCTS_URL);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Failed to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial GET on mount
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (newProduct) => {
    setError("");
    const res = await fetch(PRODUCTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    // json-server typically returns created object with id
    // Defensive fallback in case of odd mocks
    const created =
      data && typeof data === "object" && !Array.isArray(data) && data.name
        ? data
        : newProduct;

    setProducts((prev) => [...prev, created]);
    return created;
  }, []);

  const patchProduct = useCallback(async (id, patch) => {
    setError("");
    const res = await fetch(`${PRODUCTS_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    const updated = await res.json();

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );

    return updated;
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    patchProduct,
  };
}