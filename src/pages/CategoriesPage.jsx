
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import categoryApi from "../services/categoryApi";

function extractCategories(response) {
  const payload = response?.data ?? response;
  const nestedPayload = payload?.data ?? payload;

  if (Array.isArray(nestedPayload?.categories)) {
    return nestedPayload.categories;
  }

  if (Array.isArray(nestedPayload)) {
    return nestedPayload;
  }

  if (Array.isArray(payload?.categories)) {
    return payload.categories;
  }

  return [];
}

function normalizeImages(images) {
  if (Array.isArray(images)) {
    return images.filter(
      (image) => typeof image === "string" && image.trim()
    );
  }

  if (typeof images === "string" && images.trim()) {
    return [images.trim()];
  }

  return [];
}

function CategoryCard({ category }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = normalizeImages(category.images)[0];

  return (
    <Link
      to={`/products?category=${encodeURIComponent(category._id)}`}
      className="group overflow-hidden rounded-2xl border border-[#E9E5D9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E8EDDF]">
        {image && !imageFailed ? (
          <img
            src={image}
            alt={category.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={`${category.name} category image unavailable`}
            className="flex h-full w-full items-center justify-center text-[#64806A]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              fill="none"
              className="h-14 w-14"
            >
              <path
                d="M48 12C28 12 14 23 14 39c0 8 6 13 14 13 17 0 20-20 20-40Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M13 54c8-14 16-22 29-32"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h2 className="font-serif text-xl font-medium text-[#244B31] sm:text-2xl">
          {category.name}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#687568]">
          {category.description?.trim() ||
            `Explore our ${category.name.toLowerCase()} collection.`}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#27804B]">
          Explore collection
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function CategorySkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse overflow-hidden rounded-2xl border border-[#E9E5D9] bg-white"
    >
      <div className="aspect-[4/3] bg-stone-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 rounded bg-stone-200" />
        <div className="h-3 w-full rounded bg-stone-100" />
        <div className="h-3 w-4/5 rounded bg-stone-100" />
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await categoryApi.getCategories();
      setCategories(extractCategories(response));
    } catch (err) {
      setError(
        err?.message || "We couldn't load categories. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter((category) =>
      [category.name, category.description, category.slug].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [categories, search]);

  return (
    <main className="min-h-screen bg-[#FBF8F0] text-[#243D2D]">
      {/* Page introduction */}
      <section className="border-b border-[#E9E5D9] bg-[#F2F0E5]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-[#687568]"
          >
            <Link
              to="/"
              className="transition hover:text-[#245333] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page" className="font-medium text-[#245333]">
              Categories
            </span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52815C] sm:text-sm">
            Find your natural favourites
          </p>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl">
            Explore all categories
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#687568] sm:text-lg sm:leading-8">
            Browse our collections and discover thoughtful, nature-inspired
            products for your everyday routine.
          </p>
        </div>
      </section>

      {/* Category collection */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#244B31] sm:text-3xl">
              Shop by category
            </h2>
            {!loading && !error && (
              <p className="mt-2 text-sm text-[#687568]">
                {filteredCategories.length}{" "}
                {filteredCategories.length === 1 ? "category" : "categories"}
                {search.trim() ? " found" : " to explore"}
              </p>
            )}
          </div>

          <label className="block w-full sm:max-w-sm">
            <span className="sr-only">Search categories</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              className="min-h-12 w-full rounded-full border border-[#DADDD1] bg-white px-5 py-3 text-sm text-[#243D2D] outline-none transition placeholder:text-[#899185] focus:border-[#47644B] focus:ring-4 focus:ring-[#47644B]/10"
            />
          </label>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <CategorySkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-white px-6 py-10 text-center"
          >
            <p className="font-medium text-[#344936]">{error}</p>
            <button
              type="button"
              onClick={loadCategories}
              className="mt-5 rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Try again
            </button>
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E9E5D9] bg-white px-6 py-12 text-center">
            <h3 className="font-serif text-2xl text-[#244B31]">
              {search.trim()
                ? "No matching categories"
                : "No categories available yet"}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#687568]">
              {search.trim()
                ? "Try another search term to find what you're looking for."
                : "Please check back soon to explore our collections."}
            </p>
            {search.trim() && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 font-semibold text-[#27804B] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#245333] px-7 py-3 text-sm font-semibold text-[#245333] transition hover:bg-[#245333] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            Browse all products
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
