import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import ProductSort from "../components/product/ProductSort";
import productApi from "../services/productApi";

const PRODUCTS_PER_PAGE = 12;

function extractProducts(response) {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.products)) {
    return response.data.products;
  }

  if (Array.isArray(response?.products)) {
    return response.products;
  }

  return [];
}

function extractPagination(response) {
  return (
    response?.pagination ??
    response?.data?.pagination ??
    response?.data?.data?.pagination ??
    {}
  );
}

function getUniqueCategories(products) {
  const uniqueCategories = new Map();

  products.forEach((product) => {
    const category = product?.category;

    if (
      category?._id &&
      typeof category.name === "string" &&
      category.name.trim()
    ) {
      if (!uniqueCategories.has(category._id)) {
        uniqueCategories.set(category._id, category);
      }
    }
  });

  return Array.from(uniqueCategories.values());
}

function ProductSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-[#E8E5D9] bg-white"
    >
      <div className="aspect-[4/5] animate-pulse bg-[#EAE9DF]" />

      <div className="space-y-3 p-4 sm:p-5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#EAE9DF]" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-[#EAE9DF]" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-[#EAE9DF]" />
        <div className="h-10 animate-pulse rounded-full bg-[#EAE9DF]" />
      </div>
    </div>
  );
}

function ProductLoadingGrid() {
  return (
    <div
      aria-label="Loading products"
      aria-busy="true"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get("category") || "";

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PRODUCTS_PER_PAGE,
    total: 0,
    pages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Keep the selected category synchronized with the URL.
  useEffect(() => {
    setCategory(urlCategory);
    setPage(1);
  }, [urlCategory]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await productApi.getProducts({
        search,
        category,
        sort,
        page,
        limit: PRODUCTS_PER_PAGE,
      });

      const receivedProducts = extractProducts(response);
      const receivedPagination = extractPagination(response);

      setProducts(receivedProducts);

      setPagination({
        page: receivedPagination.page ?? page,
        limit: receivedPagination.limit ?? PRODUCTS_PER_PAGE,
        total: receivedPagination.total ?? receivedProducts.length,
        pages:
          receivedPagination.totalPages ??
          receivedPagination.pages ??
          1,
      });
    } catch (err) {
      setProducts([]);
      setError(err?.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Load category options independently of the selected filter.
  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        const response = await productApi.getProducts({
          sort: "-createdAt",
          page: 1,
          limit: 50,
        });

        if (!cancelled) {
          setCategories(getUniqueCategories(extractProducts(response)));
        }
      } catch {
        if (!cancelled) {
          setCategories([]);
        }
      }
    };

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);

    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set("category", value);
    } else {
      nextParams.delete("category");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setSort("-createdAt");
    setPage(1);
    setSearchParams({}, { replace: true });
  };

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((currentPage) =>
      Math.min(currentPage + 1, pagination.pages)
    );
  };

  return (
    <main className="min-h-screen bg-[#FBF8F0] text-[#263C2B]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
        {/* Page introduction */}
        <section
          aria-labelledby="products-heading"
          className="relative overflow-hidden rounded-3xl border border-[#E8E5D9] bg-[#F1F0E4] px-5 py-9 sm:px-9 sm:py-12 lg:px-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-[#D8DFCC] sm:h-64 sm:w-64"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-8 h-36 w-36 rounded-full border border-[#D8DFCC] sm:h-48 sm:w-48"
          />

          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#617A51] sm:text-sm">
              Root &amp; Leaf · Thoughtfully chosen
            </p>

            <h1
              id="products-heading"
              className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl"
            >
              Find your everyday goodness.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#657366] sm:text-base">
              Explore our collection of thoughtfully chosen products for
              a more natural everyday routine.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#456344]">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DFE8D7]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4"
                >
                  <path
                    d="M20 4c-8 0-13 3-13 10a6 6 0 0 0 6 6c7 0 7-8 7-16Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4 21c3-5 6-8 11-11" strokeLinecap="round" />
                </svg>
              </span>
              <span>Discover something good for your day</span>
            </div>
          </div>
        </section>

        {/* Search and category filters */}
        <section aria-label="Find products" className="mt-8 sm:mt-10">
          <ProductFilters
            search={searchInput}
            category={category}
            categories={categories}
            onSearchChange={setSearchInput}
            onCategoryChange={handleCategoryChange}
            onSubmit={handleSearchSubmit}
            onClear={handleClearFilters}
          />
        </section>

        {/* Product count and sorting */}
        <section
          aria-label="Product results controls"
          className="mt-8 flex flex-col gap-4 border-b border-[#E8E5D9] pb-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div aria-live="polite" aria-atomic="true">
            <p className="text-lg font-semibold text-[#244B31]">
              Explore the collection
            </p>

            <p className="mt-1 text-sm text-[#788172]">
              {loading
                ? "Finding products for you..."
                : error
                  ? "Product results are unavailable."
                  : `${pagination.total} product${
                      pagination.total === 1 ? "" : "s"
                    } found`}
            </p>
          </div>

          <ProductSort value={sort} onChange={handleSortChange} />
        </section>

        {/* Error state */}
        {error && (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6"
          >
            <h2 className="font-semibold text-red-900">
              We couldn't load the products
            </h2>

            <p className="mt-2 text-sm leading-6 text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProducts}
              className="mt-4 rounded-full bg-[#245333] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
            >
              Try again
            </button>
          </div>
        )}

        {/* Product results */}
        {loading && !error ? (
          <div className="mt-6">
            <ProductLoadingGrid />
          </div>
        ) : !error ? (
          <>
            <div className="mt-6">
              <ProductGrid products={products} />
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <nav
                aria-label="Product pagination"
                className="mt-12 flex flex-wrap items-center justify-center gap-3"
              >
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={page <= 1}
                  className="min-h-11 rounded-full border border-[#D5DDCF] bg-white px-5 py-2.5 text-sm font-semibold text-[#315B3C] transition-colors hover:bg-[#EEF1E7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="px-2 text-sm text-[#657366]">
                  Page {pagination.page} of {pagination.pages}
                </span>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={page >= pagination.pages}
                  className="min-h-11 rounded-full border border-[#D5DDCF] bg-white px-5 py-2.5 text-sm font-semibold text-[#315B3C] transition-colors hover:bg-[#EEF1E7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        ) : null}
      </div>
    </main>
  );
}

export default ProductsPage;
