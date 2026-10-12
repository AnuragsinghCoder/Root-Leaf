
import { useCallback, useEffect, useMemo, useState } from "react";
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

const inputClassName =
  "mt-2 block w-full rounded-xl border border-[#DADDD1] bg-[#FDFCF8] px-3.5 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 hover:border-[#A9B9A2] focus:border-[#47644B] focus:ring-4 focus:ring-[#47644B]/10";

function getProduct(response) {
  const payload = unwrapResponse(response);
  return payload?.product ?? payload?.data?.product ?? payload;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format((Number(amount) || 0) / 100);
}

function getImageList(images) {
  if (Array.isArray(images)) {
    return images.filter(
      (image) => typeof image === "string" && image.trim()
    );
  }

  return [];
}

function getStockStatus(product) {
  const stock = Number(product.stock);

  if (!product.isActive) {
    return {
      label: "Inactive",
      className: "border-stone-200 bg-stone-100 text-stone-600",
    };
  }

  if (!Number.isFinite(stock) || stock <= 0) {
    return {
      label: "Out of stock",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (stock <= 5) {
    return {
      label: "Low stock",
      className: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }

  return {
    label: "In stock",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };
}

function StatusBadge({ product }) {
  const status = getStockStatus(product);

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
    >
      {status.label}
    </span>
  );
}

function ProductImage({ product, className = "" }) {
  const images = getImageList(product.images);
  const [imageFailed, setImageFailed] = useState(false);
  const image = images[0];

  useEffect(() => {
    setImageFailed(false);
  }, [image]);

  if (!image || imageFailed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#EEF2E8] text-2xl text-[#71816A] ${className}`}
        aria-label={`No image available for ${product.name}`}
      >
        <span aria-hidden="true">🌿</span>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={product.name || "Product"}
      loading="lazy"
      onError={() => setImageFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

function FormField({ label, name, value, onChange, ...props }) {
  return (
    <label className="block text-sm font-medium text-[#344936]" htmlFor={name}>
      {label}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClassName}
        {...props}
      />
    </label>
  );
}

function ProductSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-[#E5E2D7] bg-white p-4"
      aria-hidden="true"
    >
      <div className="flex gap-4">
        <div className="h-20 w-20 shrink-0 rounded-xl bg-stone-200" />
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 w-2/3 rounded bg-stone-200" />
          <div className="h-3 w-1/3 rounded bg-stone-100" />
          <div className="h-3 w-1/2 rounded bg-stone-100" />
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deactivatingId, setDeactivatingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

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

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        [product.name, product.slug, product.description]
          .some((value) => String(value || "").toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && product.isActive) ||
        (statusFilter === "inactive" && !product.isActive) ||
        (statusFilter === "low-stock" &&
          product.isActive &&
          Number(product.stock) <= 5);

      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  const summary = useMemo(() => {
    const activeProducts = products.filter((product) => product.isActive);

    return {
      total: products.length,
      active: activeProducts.length,
      lowStock: activeProducts.filter(
        (product) => Number(product.stock) <= 5
      ).length,
      inactive: products.filter((product) => !product.isActive).length,
    };
  }, [products]);

  const previewImage = useMemo(() => {
    return form.images
      .split("\n")
      .map((image) => image.trim())
      .find(Boolean);
  }, [form.images]);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name ?? "",
      slug: product.slug ?? "",
      description: product.description ?? "",
      price: String(product.price ?? ""),
      category: product.category?._id ?? product.category ?? "",
      images: getImageList(product.images).join("\n"),
      stock: String(product.stock ?? ""),
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
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
      form.price.trim() === "" ||
      !Number.isInteger(price) ||
      price < 0 ||
      form.stock.trim() === "" ||
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
        setSuccess("Product updated successfully.");
      } else {
        await adminApi.createProduct(product);
        setSuccess("Product created successfully.");
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
    if (!window.confirm(`Deactivate "${product.name}"?`)) {
      return;
    }

    setError("");
    setSuccess("");
    setDeactivatingId(product._id);

    try {
      await adminApi.deleteProduct(product._id);
      setSuccess("Product deactivated successfully.");
      await loadProducts();
    } catch (err) {
      setError(err.message || "Could not deactivate product.");
    } finally {
      setDeactivatingId(null);
    }
  }

  return (
    <section className="min-w-0 space-y-7 text-stone-800">
      {/* Page header */}
      <header className="rounded-2xl border border-[#DCE4D7] bg-[#F0F2E8] p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816A]">
              Root & Leaf · Catalog
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#263F2B] sm:text-4xl">
              Product management
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
              Manage your products, maintain stock information, and keep your
              storefront catalog up to date.
            </p>
          </div>

          <button
            type="button"
            onClick={startCreate}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#31583B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B]"
          >
            <span className="text-lg" aria-hidden="true">+</span>
            Add product
          </button>
        </div>
      </header>

      {/* Feedback messages */}
      {error && (
        <div
          role="alert"
          className="flex flex-col justify-between gap-3 rounded-2xl border border-red-200 bg-white p-4 sm:flex-row sm:items-center"
        >
          <p className="text-sm leading-6 text-red-700">{error}</p>

          {!loading && (
            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 self-start text-sm font-semibold text-red-700 underline underline-offset-4"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3"
        >
          <p className="text-sm font-medium text-emerald-800">{success}</p>

          <button
            type="button"
            onClick={() => setSuccess("")}
            aria-label="Dismiss success message"
            className="text-emerald-800 hover:opacity-70"
          >
            ×
          </button>
        </div>
      )}

      {/* Catalog statistics */}
      <section aria-label="Catalog overview" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: "Products loaded",
            value: loading ? "—" : summary.total,
            icon: "▦",
          },
          {
            label: "Active products",
            value: loading ? "—" : summary.active,
            icon: "✓",
          },
          {
            label: "Low stock",
            value: loading ? "—" : summary.lowStock,
            icon: "!",
          },
          {
            label: "Inactive products",
            value: loading ? "—" : summary.inactive,
            icon: "◷",
          },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-[#E5E2D7] bg-white p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium leading-5 text-stone-500 sm:text-sm">
                {item.label}
              </p>

              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF0E5] text-sm font-semibold text-[#31583B]"
                aria-hidden="true"
              >
                {item.icon}
              </span>
            </div>

            <p className="mt-3 text-2xl font-semibold text-[#263F2B] sm:text-3xl">
              {item.value}
            </p>
          </article>
        ))}
      </section>

      {/* Create/edit form */}
      {showForm && (
        <section
          id="product-form"
          className="scroll-mt-6 overflow-hidden rounded-2xl border border-[#DCE4D7] bg-white"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#E5E2D7] bg-[#F7F8F2] px-5 py-5 sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#71816A]">
                Catalog editor
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#263F2B]">
                {editingId ? "Edit product" : "Create a product"}
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Fields and payload are kept compatible with your current API.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              aria-label="Close product form"
              className="rounded-lg border border-[#DCE4D7] bg-white px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-[#EEF2E8] disabled:opacity-50"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label="Product name *"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Organic Tulsi Tea"
                required
              />

              <FormField
                label="Product slug *"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="organic-tulsi-tea"
                required
              />

              <FormField
                label="Price in paise *"
                name="price"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 24900 for ₹249"
                required
              />

              <FormField
                label="Category ID *"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Enter an existing category ID"
                required
              />

              <FormField
                label="Stock quantity *"
                name="stock"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={form.stock}
                onChange={handleChange}
                placeholder="Available units"
                required
              />

              <div className="rounded-xl border border-[#E5E2D7] bg-[#FAF8F2] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                  Price preview
                </p>

                <p className="mt-2 text-2xl font-semibold text-[#263F2B]">
                  {form.price.trim() !== "" &&
                  Number.isInteger(Number(form.price)) &&
                  Number(form.price) >= 0
                    ? formatCurrency(Number(form.price))
                    : "—"}
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  100 paise = ₹1
                </p>
              </div>
            </div>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#344936]"
            >
              Product description
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the product and its key details..."
                className={`${inputClassName} resize-y`}
              />
            </label>

            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-[#344936]"
              >
                Product image URLs
              </label>

              <p className="mt-1 text-xs leading-5 text-stone-500">
                Enter one image URL per line. This form preserves your existing
                URL-based image workflow; it does not upload local files.
              </p>

              <textarea
                id="images"
                name="images"
                value={form.images}
                onChange={handleChange}
                rows={4}
                placeholder={"https://example.com/product-image.jpg\nhttps://example.com/another-image.jpg"}
                className={`${inputClassName} resize-y font-mono text-xs`}
              />

              {previewImage && (
                <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#E5E2D7] bg-[#FAF8F2] p-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E5E2D7] bg-white">
                    <img
                      src={previewImage}
                      alt="First product image preview"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#263F2B]">
                      First image preview
                    </p>

                    <p className="mt-1 break-all text-xs leading-5 text-stone-500">
                      {previewImage}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-xl border border-[#DCE4D7] px-5 py-3 text-sm font-semibold text-[#31583B] transition hover:bg-[#F7F8F2] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#31583B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving product..."
                  : editingId
                    ? "Save changes"
                    : "Create product"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Product list */}
      <section className="overflow-hidden rounded-2xl border border-[#E5E2D7] bg-white">
        <div className="space-y-4 border-b border-[#E5E2D7] p-5 sm:p-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#263F2B]">
              Your catalog
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Review product details, prices, inventory, and status.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_200px]">
            <label className="block">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, slug, or description..."
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="sr-only">Filter products by status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className={inputClassName}
              >
                <option value="all">All products</option>
                <option value="active">Active products</option>
                <option value="inactive">Inactive products</option>
                <option value="low-stock">Low stock (5 or fewer)</option>
              </select>
            </label>
          </div>

          {!loading && (
            <p className="text-xs text-stone-500">
              Showing {filteredProducts.length} of {products.length} loaded
              products.
            </p>
          )}
        </div>

        {loading ? (
          <div
            className="space-y-3 p-5 sm:p-6"
            role="status"
            aria-label="Loading products"
          >
            <p className="text-sm text-stone-500">Loading catalog...</p>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : error && products.length === 0 ? (
          <div className="p-6 sm:p-8">
            <p className="text-sm text-stone-600">
              The product catalog could not be loaded.
            </p>

            <button
              type="button"
              onClick={loadProducts}
              className="mt-4 rounded-xl bg-[#31583B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#25462E]"
            >
              Retry loading products
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-8">
            <span className="text-3xl" aria-hidden="true">
              🌿
            </span>

            <h3 className="mt-4 font-semibold text-[#263F2B]">
              {products.length === 0
                ? "Your catalog is empty"
                : "No matching products"}
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              {products.length === 0
                ? "Create your first product to start building the catalog."
                : "Try another search term or change the status filter."}
            </p>

            {products.length === 0 && (
              <button
                type="button"
                onClick={startCreate}
                className="mt-5 rounded-xl bg-[#31583B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#25462E]"
              >
                Add your first product
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Responsive product cards for smaller screens */}
            <div className="divide-y divide-stone-100 md:hidden">
              {filteredProducts.map((product) => (
                <article key={product._id} className="space-y-4 p-4">
                  <div className="flex min-w-0 gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#E5E2D7]">
                      <ProductImage
                        product={product}
                        className="h-full w-full"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold text-[#263F2B]">
                        {product.name}
                      </h3>

                      <p className="mt-1 break-all text-xs text-stone-500">
                        {product.slug}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#31583B]">
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-stone-500">Stock</p>
                      <p className="mt-1 text-sm font-medium">
                        {product.stock} units
                      </p>
                    </div>

                    <StatusBadge product={product} />
                  </div>

                  <div className="flex flex-wrap gap-4 border-t border-stone-100 pt-3">
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                      className="text-sm font-semibold text-[#31583B] underline-offset-4 hover:underline"
                    >
                      Edit product
                    </button>

                    {product.isActive && (
                      <button
                        type="button"
                        onClick={() => handleDeactivate(product)}
                        disabled={deactivatingId === product._id}
                        className="text-sm font-semibold text-red-700 underline-offset-4 hover:underline disabled:opacity-50"
                      >
                        {deactivatingId === product._id
                          ? "Deactivating..."
                          : "Deactivate"}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop product table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#F7F8F2] text-xs uppercase tracking-wide text-stone-500">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Product
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Price
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Stock
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="transition hover:bg-[#FDFCF8]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#E5E2D7]">
                            <ProductImage
                              product={product}
                              className="h-full w-full"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-xs break-words font-semibold text-[#263F2B]">
                              {product.name}
                            </p>
                            <p className="mt-1 max-w-xs break-all text-xs text-stone-500">
                              {product.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 font-medium text-stone-700">
                        {formatCurrency(product.price)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-stone-600">
                        {product.stock}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge product={product} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => startEdit(product)}
                            className="font-semibold text-[#31583B] hover:underline"
                          >
                            Edit
                          </button>

                          {product.isActive && (
                            <button
                              type="button"
                              onClick={() => handleDeactivate(product)}
                              disabled={deactivatingId === product._id}
                              className="font-semibold text-red-700 hover:underline disabled:opacity-50"
                            >
                              {deactivatingId === product._id
                                ? "Working..."
                                : "Deactivate"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <p className="text-xs leading-5 text-stone-500">
        The dashboard and catalog summary describe the products returned by
        your current API request, which is limited to 50 records. Product
        images are loaded from the URLs stored with each product.
      </p>
    </section>
  );
}
