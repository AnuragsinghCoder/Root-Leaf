import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <section className="rounded-3xl border border-dashed border-[#D5DDCF] bg-white/60 px-5 py-16 text-center sm:px-8 sm:py-20">
        <span
          aria-hidden="true"
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF0E3] text-[#456344]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 4 4M8 10.5h5" />
          </svg>
        </span>

        <h2 className="mt-5 font-serif text-2xl font-medium text-[#244B31] sm:text-3xl">
          Nothing here just yet
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#788172] sm:text-base">
          We couldn't find products matching your selection. Try another
          search or choose a different category.
        </p>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;