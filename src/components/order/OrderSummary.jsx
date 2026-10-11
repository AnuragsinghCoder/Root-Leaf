
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amount / 100);
}

function OrderSummary({ items, totalItems, totalAmount }) {
  return (
    <aside className="h-fit rounded-xl border p-5">
      <h2 className="text-lg font-semibold">Order summary</h2>

      <div className="mt-4 space-y-4">
        {items.map((item) => {
          const product =
            typeof item.product === "object"
              ? item.product
              : null;

          const key = product?._id || item.product;

          return (
            <div key={key} className="flex justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium">
                  {product?.name || "Unavailable product"}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm">
                {product
                  ? formatCurrency(product.price * item.quantity)
                  : "Recheck required"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between border-t pt-4">
        <span className="text-sm text-gray-600">
          Total items
        </span>
        <span>{totalItems}</span>
      </div>

      <div className="mt-3 flex justify-between gap-4">
        <span className="font-semibold">Cart total</span>
        <span className="text-lg font-bold">
          {formatCurrency(totalAmount)}
        </span>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        The server recalculates the order total and checks stock when
        you place your order.
      </p>
    </aside>
  );
}

export default OrderSummary;
