
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import orderApi from "../../services/orderApi";

function getPayload(response) {
  return response?.data ?? response;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format((amount ?? 0) / 100);
}

function formatDate(date) {
  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? "Date unavailable"
    : parsed.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}

function getStatusStyles(status) {
  const normalizedStatus = String(status || "processing").toLowerCase();

  if (
    normalizedStatus.includes("deliver") ||
    normalizedStatus.includes("complete")
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (
    normalizedStatus.includes("cancel") ||
    normalizedStatus.includes("fail")
  ) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (
    normalizedStatus.includes("pending") ||
    normalizedStatus.includes("process") ||
    normalizedStatus.includes("confirm")
  ) {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  return "border-stone-200 bg-stone-100 text-stone-700";
}

function StatusBadge({ status }) {
  const displayStatus = String(status || "Processing").replace(/[-_]/g, " ");

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyles(status)}`}
    >
      {displayStatus}
    </span>
  );
}


const ORDER_STAGES = [
  { status: "pending", label: "Order placed" },
  { status: "confirmed", label: "Confirmed" },
  { status: "processing", label: "Processing" },
  { status: "shipped", label: "Shipped" },
  { status: "delivered", label: "Delivered" },
];

function OrderProgress({ status }) {
  const currentStatus = String(status || "")
    .trim()
    .toLowerCase();

  const currentIndex = ORDER_STAGES.findIndex(
    (stage) => stage.status === currentStatus
  );

  if (currentStatus === "cancelled") {
    return (
      <section
        className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                d="M18 6 6 18M6 6l12 12"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <div>
            <h2 className="font-serif text-xl font-semibold text-red-800">
              Order cancelled
            </h2>
            <p className="mt-1 text-sm leading-6 text-red-700">
              This order has been cancelled. The normal delivery
              progress no longer applies to it.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (currentIndex === -1) {
    return (
      <section
        className="rounded-2xl border border-[#E5E2D7] bg-white p-5 sm:p-6"
        aria-live="polite"
      >
        <h2 className="font-serif text-xl font-semibold text-[#263F2B]">
          Order progress
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Current status: {status || "Unavailable"}. Progress
          details are not available for this status.
        </p>
      </section>
    );
  }

  return (
    <section
      className="rounded-2xl border border-[#E5E2D7] bg-white p-5 sm:p-6"
      aria-labelledby="order-progress-title"
    >
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#71816A]">
            Your order
          </p>
          <h2
            id="order-progress-title"
            className="mt-1 font-serif text-xl font-semibold text-[#263F2B] sm:text-2xl"
          >
            Order progress
          </h2>
        </div>

        <StatusBadge status={currentStatus} />
      </div>

      <ol className="mt-7 space-y-5 sm:space-y-0">
        {ORDER_STAGES.map((stage, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isReached = index <= currentIndex;

          return (
            <li
              key={stage.status}
              className="relative flex gap-4 sm:min-w-0 sm:flex-1 sm:flex-col sm:items-center sm:gap-3"
              aria-current={isCurrent ? "step" : undefined}
            >
              {/* Vertical connector on mobile */}
              {index < ORDER_STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[15px] top-8 h-[calc(100%+0.5rem)] w-0.5 sm:hidden ${
                    isComplete ? "bg-[#31583B]" : "bg-stone-200"
                  }`}
                />
              )}

              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                  isComplete
                    ? "border-[#31583B] bg-[#31583B] text-white"
                    : isCurrent
                      ? "border-[#31583B] bg-[#EEF2E8] text-[#31583B] ring-4 ring-[#EEF2E8]"
                      : "border-stone-300 bg-white text-stone-400"
                }`}
              >
                {isComplete ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 12 4 4L19 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>

              <div className="min-w-0 pb-1 sm:pb-0 sm:text-center">
                <p
                  className={`text-sm font-semibold ${
                    isReached
                      ? "text-[#263F2B]"
                      : "text-stone-400"
                  }`}
                >
                  {stage.label}
                </p>

                {isCurrent && (
                  <p className="mt-1 text-xs font-medium text-[#47644B]">
                    Current stage
                  </p>
                )}

                {isComplete && (
                  <p className="mt-1 text-xs text-stone-500">
                    Completed
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Horizontal progress line on larger screens */}
      <div className="mt-6 hidden sm:block">
        <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-[#31583B] transition-all duration-500"
            style={{
              width: `${(currentIndex / (ORDER_STAGES.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-stone-500">
        Progress reflects the latest order status provided by the store.
        It does not represent live courier location.
      </p>
    </section>
  );
}


function DetailCard({ title, eyebrow, children }) {
  return (
    <section className="rounded-2xl border border-[#E5E2D7] bg-white p-5 sm:p-6">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#71816A]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-1 font-serif text-xl font-semibold text-[#263F2B] sm:text-2xl">
        {title}
      </h2>

      {children}
    </section>
  );
}

function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrder = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await orderApi.getOrderById(id);
      const payload = getPayload(response);

      const result =
        payload?.order ??
        payload?.data?.order ??
        payload?.data ??
        payload;

      if (!result?._id) {
        throw new Error("Order details were not found in the response.");
      }

      setOrder(result);
    } catch (err) {
      setError(err?.message || "Unable to load this order.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  if (loading) {
    return (
      <main className="min-h-[65vh] bg-[#FAF8F2]">
        <div
          className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
          role="status"
        >
          <p className="text-sm text-stone-600">
            Loading your order details...
          </p>

          <div className="mt-6 animate-pulse space-y-4">
            <div className="h-36 rounded-2xl bg-[#EAE8DF]" />
            <div className="h-64 rounded-2xl bg-[#EAE8DF]" />
            <div className="h-40 rounded-2xl bg-[#EAE8DF]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-[65vh] bg-[#FAF8F2]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            to="/orders"
            className="text-sm font-medium text-[#47644B] hover:text-[#263F2B]"
          >
            ← Back to My Orders
          </Link>

          <section
            className="mt-6 rounded-2xl border border-[#E5E2D7] bg-white p-6 sm:p-8"
            role="alert"
          >
            <h1 className="font-serif text-2xl font-semibold text-[#263F2B]">
              We couldn&apos;t find this order
            </h1>

            <p className="mt-3 text-sm leading-6 text-stone-600">
              {error || "Order not found. Please check your order list."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={loadOrder}
                className="rounded-xl bg-[#31583B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B]"
              >
                Try again
              </button>

              <Link
                to="/orders"
                className="rounded-xl border border-[#DCE4D7] px-5 py-3 text-sm font-semibold text-[#31583B] transition hover:bg-[#EEF2E8]"
              >
                My Orders
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const address = order.shippingAddress;
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <main className="min-h-[65vh] bg-[#FAF8F2]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Navigation */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#47644B] transition hover:text-[#263F2B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#47644B]"
        >
          <span aria-hidden="true">←</span>
          Back to My Orders
        </Link>

        {/* Order header */}
        <header className="mt-6 rounded-2xl border border-[#DCE4D7] bg-[#F0F2E8] p-5 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816A]">
                Your order
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#263F2B] sm:text-4xl">
                Order details
              </h1>

              <p className="mt-3 text-sm text-stone-600">
                Placed on {formatDate(order.createdAt)}
              </p>

              <p className="mt-4 text-xs font-medium text-stone-500">
                Order ID
              </p>

              <p className="mt-1 break-all font-mono text-xs leading-5 text-stone-700 sm:text-sm">
                {order._id}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <StatusBadge status={order.orderStatus} />

              <div className="sm:text-right">
                <p className="text-xs text-stone-500">Order total</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-[#263F2B] sm:text-3xl">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Order progress */}
        <div className="mt-6">
          <OrderProgress status={order.orderStatus} />
        </div>

        {/* Main content */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            {/* Ordered products */}
            <DetailCard
              title="Items ordered"
              eyebrow={`${items.length} ${items.length === 1 ? "product line" : "product lines"}`}
            >
              {items.length > 0 ? (
                <div className="mt-5 divide-y divide-stone-100">
                  {items.map((item, index) => (
                    <div
                      key={
                        item.product?._id ||
                        item.product ||
                        `${item.name}-${index}`
                      }
                      className="flex items-start justify-between gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <h3 className="break-words text-sm font-semibold text-[#263F2B] sm:text-base">
                          {item.name || "Product"}
                        </h3>

                        <p className="mt-2 text-sm text-stone-500">
                          {formatCurrency(item.price)}{" "}
                          <span aria-label="times">×</span>{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-[#263F2B] sm:text-base">
                        {formatCurrency(
                          (item.price ?? 0) * (item.quantity ?? 0)
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-stone-500">
                  No item details are available for this order.
                </p>
              )}

              {/* Price breakdown */}
              <div className="mt-6 space-y-3 border-t border-stone-200 pt-5 text-sm">
                <div className="flex justify-between gap-4 text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-800">
                    {formatCurrency(order.subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-stone-600">
                  <span>Shipping</span>
                  <span className="font-medium text-stone-800">
                    {formatCurrency(order.shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-t border-stone-200 pt-4 text-base font-semibold text-[#263F2B]">
                  <span>Total paid / due</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </DetailCard>

            {/* Shipping address */}
            <DetailCard title="Shipping address" eyebrow="Delivery information">
              {address ? (
                <address className="mt-4 space-y-1 text-sm leading-6 text-stone-600 not-italic">
                  {address.fullName && (
                    <p className="font-semibold text-[#263F2B]">
                      {address.fullName}
                    </p>
                  )}

                  {address.phone && <p>{address.phone}</p>}

                  {address.addressLine && <p>{address.addressLine}</p>}

                  {(address.city || address.state || address.postalCode) && (
                    <p>
                      {[address.city, address.state, address.postalCode]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}

                  {address.country && <p>{address.country}</p>}
                </address>
              ) : (
                <p className="mt-4 text-sm text-stone-500">
                  No shipping address is available for this order.
                </p>
              )}
            </DetailCard>
          </div>

          {/* Order and payment summary */}
          <aside className="space-y-6">
            <DetailCard title="Order summary" eyebrow="Purchase overview">
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Order status</dt>
                  <dd className="text-right font-medium capitalize text-[#263F2B]">
                    {String(order.orderStatus || "Processing").replace(
                      /[-_]/g,
                      " "
                    )}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Products</dt>
                  <dd className="font-medium text-stone-800">
                    {items.length}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-stone-500">Order date</dt>
                  <dd className="text-right font-medium text-stone-800">
                    {formatDate(order.createdAt)}
                  </dd>
                </div>
              </dl>
            </DetailCard>

            <DetailCard title="Payment" eyebrow="Payment information">
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF2E8] text-lg text-[#31583B]">
                  <span aria-hidden="true">₹</span>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#263F2B]">
                    Payment status
                  </p>

                  <div className="mt-2">
                    <StatusBadge status={order.paymentStatus} />
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-[#FAF8F2] p-4">
                <p className="text-sm font-medium text-[#263F2B]">
                  Payment processing
                </p>

                <p className="mt-2 text-xs leading-5 text-stone-600">
                  Online payment is not enabled in this phase. This page
                  displays the payment status returned by your backend.
                </p>
              </div>
            </DetailCard>

            <Link
              to="/products"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#31583B] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B]"
            >
              Continue shopping
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderDetailsPage;
