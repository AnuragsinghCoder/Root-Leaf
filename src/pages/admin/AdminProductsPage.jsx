import { useCallback, useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import { getList, unwrapResponse } from "../../utils/adminResponse";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  category: "",
  images: "",
  stock: "",
};

function getProduct(response) {
  const payload = unwrapResponse(response);
  return payload?.product ?? payload?.data?.product ?? payload;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminApi.getProducts({ limit: "50" });
      setProducts(getList(response, "products"));
    } catch (err) {
      setError(err.message || "Could not load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name ?? "",
      slug: product.slug ?? "",
      description: product.description ?? "",
      price: String(product.price ?? ""),
      category: product.category?._id ?? product.category ?? "",
      images: Array.isArray(product.images)
        ? product.images.join("\n")
        : "",
      stock: String(product.stock ?? ""),
    });
    setError("");
    setSuccess("");
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.slug.trim() ||
      !form.category.trim() ||
      !Number.isInteger(price) ||
      price < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setError(
        "Enter a name, slug, category ID, whole-number price in paise, and non-negative whole-number stock."
      );
      return;
    }

    const product = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      price,
      category: form.category.trim(),
      images: form.images
        .split("\n")
        .map((image) => image.trim())
        .filter(Boolean),
      stock,
    };

    setSaving(true);

    try {
      if (editingId) {
        await adminApi.updateProduct(editingId, product);
        setSuccess("Product updated.");
      } else {
        await adminApi.createProduct(product);
        setSuccess("Product created.");
      }

      resetForm();
      await loadProducts();
    } catch (err) {
      setError(err.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivate(product) {
    if (!window.confirm(`Deactivate "${product.name}"?`)) return;

    setError("");
    setSuccess("");

    try {
      await adminApi.deleteProduct(product._id);
      setSuccess("Product deactivated.");
      await loadProducts();
    } catch (err) {
      setError(err.message || "Could not deactivate product.");
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="mt-1 text-sm text-slate-600">
          Create and maintain your store catalog.
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="rounded-lg bg-green-50 p-3 text-green-700">
          {success}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-xl border bg-white p-4 sm:grid-cols-2"
      >
        <h2 className="font-semibold sm:col-span-2">
          {editingId ? "Edit product" : "Create product"}
        </h2>

        {[
          ["name", "Product name"],
          ["slug", "Slug"],
          ["price", "Price in paise"],
          ["category", "Category ID"],
          ["stock", "Stock quantity"],
        ].map(([name, label]) => (
          <label key={name} className="grid gap-1 text-sm">
            {label}
            <input
              name={name}
              value={form[name]}
              onChange={handleChange}
              required
              className="rounded-lg border px-3 py-2"
            />
          </label>
        ))}

        <label className="grid gap-1 text-sm sm:col-span-2">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="rounded-lg border px-3 py-2"
          />
        </label>

        <label className="grid gap-1 text-sm sm:col-span-2">
          Image URLs (one per line)
          <textarea
            name="images"
            value={form.images}
            onChange={handleChange}
            rows={3}
            className="rounded-lg border px-3 py-2"
          />
        </label>

        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <button
            disabled={saving}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Create product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border px-4 py-2"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-4" colSpan={5}>Loading products…</td></tr>
            ) : products.length === 0 ? (
              <tr><td className="p-4" colSpan={5}>No products found.</td></tr>
            ) : products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-3">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.slug}</p>
                </td>
                <td className="p-3">
                  {(product.price / 100).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">
                  {product.isActive ? "Active" : "Inactive"}
                </td>
                <td className="space-x-3 p-3">
                  <button
                    type="button"
                    onClick={() => startEdit(product)}
                    className="text-blue-700 hover:underline"
                  >
                    Edit
                  </button>
                  {product.isActive && (
                    <button
                      type="button"
                      onClick={() => handleDeactivate(product)}
                      className="text-red-700 hover:underline"
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}