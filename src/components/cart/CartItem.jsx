import QuantitySelector from "./QuantitySelector";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function CartItem({ item, busy, onQuantityChange, onRemove }) {
  const product =
    item.product && typeof item.product === "object"
      ? item.product
      : null;

  const quantity = item.quantity;
  const stock = product?.stock ?? 0;

  if (!product) {
    return (
      <article className="rounded-2xl border border-[#e7e4d9] bg-white p-5 sm:p-6">
        <p className="font-semibold text-[#243b2a]">
          Product unavailable
        </p>
        <p className="mt-2 text-sm leading-6 text-[#777c6d]">
          This product is no longer available. Remove it from your cart to
          continue.
        </p>

        <button
          type="button"
          disabled={busy}
          onClick={onRemove}
          className="mt-4 text-sm font-semibold text-red-700 underline underline-offset-4 disabled:opacity-50"
        >
          {busy ? "Please wait..." : "Remove item"}
        </button>
      </article>
    );
  }

  return (
    <article className="flex min-w-0 flex-col gap-4 rounded-2xl border border-[#e7e4d9] bg-white p-4 shadow-[0_3px_16px_rgba(36,59,42,0.03)] transition hover:border-[#d6ddcc] sm:flex-row sm:gap-5 sm:p-5">
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f0eee3] sm:h-32 sm:w-32">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name || "Cart product"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-2 text-center text-xs text-[#777c6d]">
            Image unavailable
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="break-words text-base font-semibold leading-6 text-[#243b2a] sm:text-lg">
              {product.name}
            </h2>
            <p className="mt-2 text-sm text-[#777c6d]">
              {formatCurrency(product.price)} each
            </p>
          </div>

          <p className="shrink-0 text-base font-semibold text-[#315c3b] sm:text-right">
            {formatCurrency(product.price * quantity)}
          </p>
        </div>

        <p
          className={`mt-2 text-xs font-medium ${
            stock > 0 ? "text-[#4f7545]" : "text-red-700"
          }`}
        >
          {stock > 0 ? `${stock} available` : "Out of stock"}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-auto sm:pt-4">
          <QuantitySelector
            quantity={quantity}
            stock={stock}
            disabled={busy || stock === 0}
            onChange={onQuantityChange}
          />

          <button
            type="button"
            disabled={busy}
            onClick={onRemove}
            className="rounded-full px-2 py-2 text-sm font-medium text-[#777c6d] underline decoration-[#d8d8c9] underline-offset-4 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Please wait..." : "Remove"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;