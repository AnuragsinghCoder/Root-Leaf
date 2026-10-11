
import { Link } from "react-router-dom";
import AddToCartButton from "../cart/AddToCartButton";

function ProductCard({ product }) {
  const hasStock = product.stock > 0;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(product.price / 100);

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E8E5D9] bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4">
      <Link
        to={`/products/${product._id}`}
        className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
        aria-label={`View ${product.name}`}
      >
        <div className="relative overflow-hidden rounded-xl bg-[#F0EDE2]">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center px-3 text-center text-sm text-[#748073]">
              Image coming soon
            </div>
          )}

          <span
            className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:left-3 sm:top-3 sm:text-xs ${
              hasStock
                ? "bg-[#EAF0E3] text-[#315B3C]"
                : "bg-white/95 text-[#8B4C3E]"
            }`}
          >
            {hasStock ? "In stock" : "Out of stock"}
          </span>
        </div>

        {categoryName && (
          <p className="mt-3 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A8975] sm:text-xs">
            {categoryName}
          </p>
        )}

        <h2 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#294B32] transition-colors group-hover:text-[#176B43] sm:text-base">
          {product.name}
        </h2>
      </Link>

      <div className="mt-auto pt-3">
        <p className="text-sm font-semibold text-[#244B31] sm:text-base">
          {formattedPrice}
        </p>

        <div className="mt-3">
          <AddToCartButton product={product} />
        </div>

        <Link
          to={`/products/${product._id}`}
          className="mt-3 inline-flex min-h-9 w-full items-center justify-center rounded-lg border border-[#D8E0D3] px-3 py-2 text-xs font-semibold text-[#315B3C] transition-colors hover:bg-[#EDF2E8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] sm:text-sm"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
