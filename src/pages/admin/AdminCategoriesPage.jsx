
import { useCallback, useEffect, useMemo, useState } from "react";
import categoryApi from "../../services/categoryApi";
import { getList } from "../../utils/adminResponse";

const emptyForm = {
  name: "",
  description: "",
  imageUrls: [],
};

const inputClassName =
  "mt-2 block w-full rounded-xl border border-[#DADDD1] bg-[#FDFCF8] px-3.5 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 hover:border-[#A9B9A2] focus:border-[#47644B] focus:ring-4 focus:ring-[#47644B]/10";

function normalizeImages(images) {
  if (Array.isArray(images)) {
    return images.filter(
      (image) => typeof image === "string" && image.trim()
    ).map((image) => image.trim());
  }

  if (typeof images === "string" && images.trim()) {
    return [images.trim()];
  }

  return [];
}

function CategoryStatusBadge({ isActive }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${
        isActive
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-stone-200 bg-stone-100 text-stone-600"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

function CategorySkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-[#E5E2D7] bg-white p-5"
      aria-hidden="true"
    >
      <div className="h-4 w-1/3 rounded bg-stone-200" />
      <div className="mt-3 h-3 w-2/3 rounded bg-stone-100" />
      <div className="mt-5 h-3 w-1/4 rounded bg-stone-100" />
    </div>
  );
}

function CategoryFormField({
  label,
  name,
  value,
  onChange,
  ...props
}) {
  return (
    <label
      htmlFor={name}
      className="block text-sm font-medium text-[#344936]"
    >
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

function CategoryImage({ images, name, size = "small" }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = normalizeImages(images)[0];

  const dimensions =
    size === "large" ? "h-20 w-20" : "h-14 w-14";

  if (!imageUrl || failed) {
    return (
      <div
        role="img"
        aria-label={`No available image for ${name}`}
        className={`flex ${dimensions} shrink-0 items-center justify-center rounded-xl border border-[#E5E2D7] bg-[#F0F2E8] text-xs text-stone-500`}
      >
        No image
      </div>
    );
  }

  return (
    <img
      key={imageUrl}
      src={imageUrl}
      alt={`${name} category`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${dimensions} shrink-0 rounded-xl border border-[#E5E2D7] bg-[#F7F8F2] object-cover`}
    />
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deactivatingId, setDeactivatingId] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await categoryApi.getAllCategories();
      setCategories(getList(response, "categories"));
    } catch (err) {
      setError(err.message || "Could not load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const summary = useMemo(() => {
    const active = categories.filter((category) => category.isActive);

    return {
      total: categories.length,
      active: active.length,
      inactive: categories.length - active.length,
    };
  }, [categories]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch = [
        category.name,
        category.slug,
        category.description,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && category.isActive) ||
        (statusFilter === "inactive" && !category.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const previewImage = useMemo(
    () => form.imageUrls.find((url) => url.trim())?.trim() || "",
    [form.imageUrls]
  );

  function startCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, imageUrls: [] });
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function startEdit(category) {
    setEditingId(category._id);
    setForm({
      name: category.name ?? "",
      description: category.description ?? "",
      imageUrls: normalizeImages(category.images),
    });
    setError("");
    setSuccess("");
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setForm({ ...emptyForm, imageUrls: [] });
    setShowForm(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImageUrlsChange(event) {
    setForm((current) => ({
      ...current,
      imageUrls: event.target.value.split("\n"),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const name = form.name.trim();
    const description = form.description.trim();

    const imageUrls = form.imageUrls
      .map((url) => url.trim())
      .filter(Boolean);

    if (name.length < 2 || name.length > 80) {
      setError("Category name must be between 2 and 80 characters.");
      return;
    }

    if (description.length > 500) {
      setError("Description cannot exceed 500 characters.");
      return;
    }

    if (imageUrls.some((url) => url.length > 500)) {
      setError("Each image URL cannot exceed 500 characters.");
      return;
    }

    for (const imageUrl of imageUrls) {
      try {
        const parsedUrl = new URL(imageUrl);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          setError("Image URLs must start with http:// or https://.");
          return;
        }
      } catch {
        setError(`Please enter a valid image URL: ${imageUrl}`);
        return;
      }
    }

    setSaving(true);

    try {
      const categoryData = {
        name,
        description,
        images: imageUrls,
      };

      if (editingId) {
        await categoryApi.updateCategory(editingId, categoryData);
        setSuccess("Category updated successfully.");
      } else {
        await categoryApi.createCategory(categoryData);
        setSuccess("Category created successfully.");
      }

      resetForm();
      await loadCategories();
    } catch (err) {
      setError(err.message || "Could not save the category.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivate(category) {
    if (!category.isActive) return;

    const confirmed = window.confirm(
      `Deactivate "${category.name}"? It will no longer appear in the active category list.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeactivatingId(category._id);

    try {
      await categoryApi.deactivateCategory(category._id);
      setSuccess("Category deactivated successfully.");
      await loadCategories();
    } catch (err) {
      setError(err.message || "Could not deactivate the category.");
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
              Root &amp; Leaf · Catalog
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#263F2B] sm:text-4xl">
              Category management
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
              Organize your product catalog, update category details,
              and control which categories are active in your store.
            </p>
          </div>

          <button
            type="button"
            onClick={startCreate}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#31583B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B]"
          >
            <span className="text-lg" aria-hidden="true">+</span>
            Add category
          </button>
        </div>
      </header>

      {/* Error feedback */}
      {error && (
        <div
          role="alert"
          className="flex flex-col justify-between gap-3 rounded-2xl border border-red-200 bg-white p-4 sm:flex-row sm:items-center"
        >
          <p className="text-sm leading-6 text-red-700">{error}</p>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 self-start text-sm font-semibold text-red-700 underline underline-offset-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Success feedback */}
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

      {/* Summary cards */}
      <section
        aria-label="Category overview"
        className="grid grid-cols-2 gap-3 xl:grid-cols-3"
      >
        {[
          { label: "Total categories", value: summary.total, icon: "▦" },
          { label: "Active categories", value: summary.active, icon: "✓" },
          { label: "Inactive categories", value: summary.inactive, icon: "○" },
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
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF0E5] text-sm font-semibold text-[#31583B]"
              >
                {loading ? "…" : item.icon}
              </span>
            </div>

            <p className="mt-3 text-2xl font-semibold text-[#263F2B] sm:text-3xl">
              {loading ? "—" : item.value}
            </p>
          </article>
        ))}
      </section>

      {/* Create / edit form */}
      {showForm && (
        <section
          id="category-form"
          className="overflow-hidden rounded-2xl border border-[#DCE4D7] bg-white"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#E5E2D7] bg-[#F7F8F2] px-5 py-5 sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#71816A]">
                Category editor
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#263F2B]">
                {editingId ? "Edit category" : "Create a category"}
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                The backend generates the category slug from its name.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              disabled={saving}
              className="rounded-lg border border-[#DCE4D7] bg-white px-3 py-2 text-sm font-semibold text-stone-600 hover:bg-[#EEF2E8] disabled:opacity-50"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-7">
            <CategoryFormField
              label="Category name *"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Herbal Teas"
              minLength={2}
              maxLength={80}
              required
            />

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#344936]"
            >
              Description
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                placeholder="Describe the products in this category..."
                className={`${inputClassName} resize-y`}
              />

              <span className="mt-2 block text-xs font-normal text-stone-500">
                {form.description.length}/500 characters
              </span>
            </label>

            {/* Multiple category image URLs */}
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-[#344936]"
              >
                Category image URLs
              </label>

              <p className="mt-1 text-xs leading-5 text-stone-500">
                Enter one public image URL per line. The first image is
                used as the category thumbnail. This does not upload local files.
              </p>

              <textarea
                id="images"
                name="images"
                value={form.imageUrls.join("\n")}
                onChange={handleImageUrlsChange}
                rows={4}
                maxLength={5000}
                placeholder={`https://example.com/herbal-tea.jpg\nhttps://example.com/green-tea.jpg`}
                className={`${inputClassName} resize-y font-mono text-xs`}
              />

              {previewImage && (
                <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#E5E2D7] bg-[#FAF8F2] p-3">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E5E2D7] bg-white">
                    <img
                      key={previewImage}
                      src={previewImage}
                      alt="First category image preview"
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                      onLoad={(event) => {
                        event.currentTarget.style.visibility = "visible";
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
                className="inline-flex items-center justify-center rounded-xl bg-[#31583B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save changes"
                    : "Create category"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Category list */}
      <section className="overflow-hidden rounded-2xl border border-[#E5E2D7] bg-white">
        <div className="space-y-4 border-b border-[#E5E2D7] p-5 sm:p-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#263F2B]">
              Your categories
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Search, review, and manage your product categories.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_200px]">
            <label className="block">
              <span className="sr-only">Search categories</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, slug, or description..."
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="sr-only">Filter categories by status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className={inputClassName}
              >
                <option value="all">All categories</option>
                <option value="active">Active categories</option>
                <option value="inactive">Inactive categories</option>
              </select>
            </label>
          </div>

          {!loading && (
            <p className="text-xs text-stone-500">
              Showing {filteredCategories.length} of {categories.length} categories.
            </p>
          )}
        </div>

        {loading ? (
          <div
            className="space-y-3 p-5 sm:p-6"
            role="status"
            aria-label="Loading categories"
          >
            <p className="text-sm text-stone-500">Loading categories...</p>
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </div>
        ) : error && categories.length === 0 ? (
          <div className="p-6 sm:p-8">
            <p className="text-sm text-stone-600">
              The category list could not be loaded.
            </p>

            <button
              type="button"
              onClick={loadCategories}
              className="mt-4 rounded-xl bg-[#31583B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#25462E]"
            >
              Retry loading categories
            </button>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-8">
            <span className="text-3xl" aria-hidden="true">🌿</span>

            <h3 className="mt-4 font-semibold text-[#263F2B]">
              {categories.length === 0
                ? "No categories yet"
                : "No matching categories"}
            </h3>

            <p className="mt-2 text-sm text-stone-500">
              {categories.length === 0
                ? "Create your first category to organize your catalog."
                : "Try another search term or status filter."}
            </p>

            {categories.length === 0 && (
              <button
                type="button"
                onClick={startCreate}
                className="mt-5 rounded-xl bg-[#31583B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#25462E]"
              >
                Add your first category
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile category cards */}
            <div className="divide-y divide-stone-100 md:hidden">
              {filteredCategories.map((category) => (
                <article key={category._id} className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <CategoryImage
                        images={category.images}
                        name={category.name}
                      />

                      <div className="min-w-0">
                        <h3 className="break-words text-sm font-semibold text-[#263F2B]">
                          {category.name}
                        </h3>

                        <p className="mt-1 break-all text-xs text-stone-500">
                          {category.slug}
                        </p>
                      </div>
                    </div>

                    <CategoryStatusBadge isActive={category.isActive} />
                  </div>

                  <p className="break-words text-sm leading-6 text-stone-600">
                    {category.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-4 border-t border-stone-100 pt-3">
                    <button
                      type="button"
                      onClick={() => startEdit(category)}
                      className="text-sm font-semibold text-[#31583B] underline-offset-4 hover:underline"
                    >
                      Edit category
                    </button>

                    {category.isActive && (
                      <button
                        type="button"
                        onClick={() => handleDeactivate(category)}
                        disabled={deactivatingId === category._id}
                        className="text-sm font-semibold text-red-700 underline-offset-4 hover:underline disabled:opacity-50"
                      >
                        {deactivatingId === category._id
                          ? "Deactivating..."
                          : "Deactivate"}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop category table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-[#F7F8F2] text-xs uppercase tracking-wide text-stone-500">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Image
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Category
                    </th>
                    <th scope="col" className="px-5 py-4 font-semibold">
                      Description
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
                  {filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="transition hover:bg-[#FDFCF8]"
                    >
                      <td className="px-5 py-4">
                        <CategoryImage
                          images={category.images}
                          name={category.name}
                        />
                      </td>

                      <td className="max-w-[220px] px-5 py-4">
                        <p className="break-words font-semibold text-[#263F2B]">
                          {category.name}
                        </p>

                        <p className="mt-1 break-all text-xs text-stone-500">
                          {category.slug}
                        </p>
                      </td>

                      <td className="max-w-sm px-5 py-4">
                        <p className="break-words leading-6 text-stone-600">
                          {category.description || "—"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <CategoryStatusBadge isActive={category.isActive} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => startEdit(category)}
                            className="font-semibold text-[#31583B] hover:underline"
                          >
                            Edit
                          </button>

                          {category.isActive && (
                            <button
                              type="button"
                              onClick={() => handleDeactivate(category)}
                              disabled={deactivatingId === category._id}
                              className="font-semibold text-red-700 hover:underline disabled:opacity-50"
                            >
                              {deactivatingId === category._id
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
        Category slugs are generated by your backend. Deactivating a category
        marks it inactive instead of permanently deleting its database record.
      </p>
    </section>
  );
}
