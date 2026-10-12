function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((Number(amount) || 0) / 100);
}

function getProductImage(product) {
  const image = product?.images?.[0];

  if (typeof image === "string") {
    return image;
  }

  if (image && typeof image === "object") {
    return image.url || image.imageUrl || "";
  }

  return "";
}

function OrderSummary({ items = [], totalItems = 0, totalAmount = 0 }) {
  return (
    <aside className="h-fit rounded-3xl border border-[#e7e4d9] bg-white p-5 shadow-[0_8px_32px_rgba(36,59,42,0.035)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6c815e]">
            Your selection
          </p>

          <h2 className="mt-2 text-xl font-semibold text-[#243b2a]">
            Order summary
          </h2>
        </div>

        <span className="rounded-full bg-[#f0f3e9] px-3 py-1.5 text-xs font-semibold text-[#315c3b]">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {items.map((item) => {
          const product =
            typeof item.product === "object" && item.product !== null
              ? item.product
              : null;

          const key = product?._id || item.product;
          const image = getProductImage(product);

          return (
            <div key={key} className="flex items-start gap-3">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#eeece3] bg-[#f6f5ef]">
                {image ? (
                  <img
                    src={image}
                    alt={product?.name || "Product"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-2xl" aria-hidden="true">
                    🌿
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <p className="line-clamp-2 text-sm font-semibold leading-5 text-[#243b2a]">
                  {product?.name || "Unavailable product"}
                </p>

                <p className="mt-1.5 text-xs text-[#777c6d]">
                  Quantity: {item.quantity}
                </p>

                {!product && (
                  <p className="mt-1 text-xs text-amber-700">
                    Product details unavailable
                  </p>
                )}
              </div>

              <p className="shrink-0 pt-1 text-sm font-semibold text-[#315c3b]">
                {product
                  ? formatCurrency(
                      (Number(product.price) || 0) *
                        (Number(item.quantity) || 0)
                    )
                  : "—"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-3 border-t border-[#e7e4d9] pt-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-[#777c6d]">Total items</span>
          <span className="font-medium text-[#243b2a]">{totalItems}</span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-[#777c6d]">Shipping</span>
          <span className="text-right text-xs text-[#777c6d]">
            Confirmed by checkout
          </span>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-[#e7e4d9] pt-4">
          <div>
            <p className="font-semibold text-[#243b2a]">Cart total</p>
            <p className="mt-1 text-xs text-[#777c6d]">
              Based on your current basket
            </p>
          </div>

          <p className="text-xl font-semibold tracking-tight text-[#315c3b]">
            {formatCurrency(totalAmount)}
          </p>
        </div>
      </div>

      <p className="mt-5 rounded-xl bg-[#f4f5ec] p-3.5 text-xs leading-5 text-[#66705e]">
        Your order total and product availability are checked by the server
        when you place your order.
      </p>
    </aside>
  );
}

export default OrderSummary;
