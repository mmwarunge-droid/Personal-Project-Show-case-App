import { useMemo, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductGrid from "../components/ProductGrid";
import { useProductsContext } from "../context/ProductsContext";

/**
 * Admin page:
 * - Add product (POST)
 * - Edit product (PATCH)
 * - Select a product to edit by clicking card
 */
export default function Admin() {
  const { products, addProduct, patchProduct, loading, error } = useProductsContext();
  const [selectedId, setSelectedId] = useState(null);

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.id === selectedId) ?? null;
  }, [products, selectedId]);

  async function handleAdd(payload) {
    const created = await addProduct(payload);
    // Optional: select newly created product to edit immediately
    if (created?.id) setSelectedId(created.id);
  }

  async function handleEdit(payload) {
    if (!selectedProduct) return;
    await patchProduct(selectedProduct.id, payload);
  }

  return (
    <div className="adminLayout">
      <section className="adminPanel">
        <h2 className="panelTitle">Admin Portal</h2>

        <div className="adminForms">
          <div className="panelBlock">
            <h3 className="panelHeading">Add New Product</h3>
            <ProductForm
              mode="add"
              submitLabel="Submit"
              onSubmit={handleAdd}
            />
          </div>

          <div className="panelBlock">
            <h3 className="panelHeading">Edit Product</h3>
            {selectedProduct ? (
              <ProductForm
                mode="edit"
                submitLabel="Save Changes"
                initialValues={{
                  name: selectedProduct.name ?? "",
                  description: selectedProduct.description ?? "",
                  origin: selectedProduct.origin ?? "",
                  price: selectedProduct.price ?? "",
                  location: selectedProduct.location ?? "Location 1",
                }}
                onSubmit={handleEdit}
              />
            ) : (
              <p className="status">Click a product below to edit it.</p>
            )}
          </div>
        </div>

        <hr className="divider" />

        <h3 className="panelHeading">Products</h3>
        {loading ? <p className="status">Loading…</p> : null}
        {error ? <p className="status error">{error}</p> : null}

        {!loading && !error ? (
          <ProductGrid
            products={products}
            onSelect={(p) => setSelectedId(p.id)}
          />
        ) : null}
      </section>
    </div>
  );
}