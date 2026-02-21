import { useEffect, useId, useMemo, useRef, useState } from "react";

/**
 * Product form used for:
 * - Admin "Add Product" (POST)
 * - Admin "Edit Product" (PATCH)
 *
 * useId: accessible label/input pairing
 * useRef: focus first field on mount
 */
export default function ProductForm({ mode, initialValues, onSubmit, submitLabel }) {
  const nameId = useId();
  const descId = useId();
  const originId = useId();
  const priceId = useId();
  const locationId = useId();

  const firstInputRef = useRef(null);

  const defaults = useMemo(
    () => ({
      name: "",
      description: "",
      origin: "",
      price: "",
      location: "Location 1",
    }),
    []
  );

  const [form, setForm] = useState(initialValues ?? defaults);
  const [error, setError] = useState("");

  useEffect(() => {
    // When editing, initialValues can change after selecting a product.
    setForm(initialValues ?? defaults);
  }, [initialValues, defaults]);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Small validation
    if (!form.name.trim()) return setError("Coffee name is required.");
    if (!form.origin.trim()) return setError("Origin is required.");
    if (!form.description.trim()) return setError("Description is required.");

    const priceNum = Number(form.price);
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      return setError("Price must be a positive number.");
    }

    // Keep payload consistent with backend shape
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      origin: form.origin.trim(),
      price: priceNum,
      location: form.location,
    };

    await onSubmit(payload);

    // Reset only in ADD mode
    if (mode === "add") setForm(defaults);
  }

  return (
    <form className="form" onSubmit={handleSubmit} aria-label="Product form">
      {error ? <p className="formError" role="alert">{error}</p> : null}

      <label className="field">
        <span className="fieldLabel" id={nameId}>Coffee Name</span>
        <input
          ref={firstInputRef}
          aria-labelledby={nameId}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Type here"
        />
      </label>

      <label className="field">
        <span className="fieldLabel" id={descId}>Description</span>
        <input
          aria-labelledby={descId}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Type here"
        />
      </label>

      <label className="field">
        <span className="fieldLabel" id={originId}>Origin</span>
        <input
          aria-labelledby={originId}
          name="origin"
          value={form.origin}
          onChange={handleChange}
          placeholder="Type here"
        />
      </label>

      <label className="field">
        <span className="fieldLabel" id={priceId}>Price</span>
        <input
          aria-labelledby={priceId}
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Type here"
          inputMode="numeric"
        />
      </label>

      <label className="field">
        <span className="fieldLabel" id={locationId}>Location</span>
        <select
          aria-labelledby={locationId}
          name="location"
          value={form.location}
          onChange={handleChange}
        >
          <option>Location 1</option>
          <option>Location 2</option>
          <option>Location 3</option>
          <option>Location 4</option>
        </select>
      </label>

      <button className="btn" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}