function ProductFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
  onSubmit,
  onClear,
}) {
  const fieldClassName =
    "mt-2 block min-h-11 w-full rounded-xl border border-[#DCDDCF] bg-white px-3.5 py-2.5 text-sm text-[#263C2B] outline-none transition placeholder:text-[#9A9F91] focus:border-[#56764E] focus:ring-2 focus:ring-[#DCE7D5]";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#E8E5D9] bg-white/80 p-4 shadow-[0_4px_20px_rgba(40,60,35,0.03)] sm:p-6"
    >
      <div className="mb-5 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF0E3] text-[#315B3C]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <path d="M4 7h16M7 12h10M10 17h4" />
          </svg>
        </span>

        <div>
          <h2 className="text-sm font-semibold text-[#244B31]">
            Find your favourites
          </h2>
          <p className="mt-0.5 text-xs text-[#788172]">
            Search or browse by category
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-[minmax(0,1fr)_220px]">
        <div>
          <label
            htmlFor="product-search"
            className="block text-sm font-medium text-[#435D47]"
          >
            Search products
          </label>

          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Try a product name..."
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-[#435D47]"
          >
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className={fieldClassName}
          >
            <option value="">All categories</option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:col-span-2 md:grid-cols-[auto_auto] md:justify-start">
          <button
            type="submit"
            className="min-h-11 rounded-full bg-[#245333] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
          >
            Search products
          </button>

          <button
            type="button"
            onClick={onClear}
            className="min-h-11 rounded-full border border-[#D5DDCF] bg-transparent px-6 py-2.5 text-sm font-semibold text-[#435D47] transition-colors hover:bg-[#EEF1E7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C]"
          >
            Clear filters
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductFilters;