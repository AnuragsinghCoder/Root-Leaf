
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    : parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
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

function StatusBadge({ status, label }) {
  const displayStatus = String(status || "Processing").replace(/[-_]/g, " ");

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyles(status)}`}
    >
      {label ? `${label}: ` : ""}
      {displayStatus}
    </span>
  );
}

function OrderSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-stone-200 bg-white p-5 sm:p-6"
      aria-hidden="true"
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="space-y-3">
          <div className="h-3 w-28 rounded bg-stone-200" />
          <div className="h-4 w-44 rounded bg-stone-200" />
        </div>

        <div className="space-y-3 sm:text-right">
          <div className="h-5 w-24 rounded bg-stone-200" />
          <div className="h-5 w-20 rounded-full bg-stone-200" />
        </div>
      </div>

      <div className="mt-6 h-3 w-40 rounded bg-stone-200" />
      <div className="mt-5 h-10 w-40 rounded-xl bg-stone-200" />
    </div>
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await orderApi.getMyOrders();
      const payload = getPayload(response);

      const results = Array.isArray(payload)
        ? payload
        : payload?.orders ?? payload?.data?.orders;

      if (!Array.isArray(results)) {
        throw new Error("Unexpected order list response.");
      }

      setOrders(results);
    } catch (err) {
      setError(
        err?.message || "Unable to load your orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <main className="min-h-[65vh] bg-[#FAF8F2]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Page heading */}
        <div className="mb-8 sm:mb-10">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#47644B] transition hover:text-[#263F2B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#47644B]"
          >
            <span aria-hidden="true">←</span>
            Back to my account
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816A]">
                Your Root & Leaf account
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#263F2B] sm:text-4xl">
                My orders
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600 sm:text-base">
                Keep track of your purchases and revisit the details of the
                products you love.
              </p>
            </div>

            {!loading && !error && orders.length > 0 && (
              <div className="w-fit rounded-xl border border-[#DCE4D7] bg-white px-4 py-3">
                <p className="text-xs text-stone-500">Total orders</p>
                <p className="mt-1 text-xl font-semibold text-[#263F2B]">
                  {orders.length}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="space-y-4" role="status" aria-label="Loading orders">
            <p className="text-sm text-stone-600">Loading your orders...</p>
            <OrderSkeleton />
            <OrderSkeleton />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <section
            className="rounded-2xl border border-red-200 bg-white p-6 sm:p-8"
            role="alert"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl text-red-700">
              !
            </div>

            <h2 className="mt-4 text-lg font-semibold text-[#263F2B]">
              We couldn&apos;t load your orders
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-600">{error}</p>

            <button
              type="button"
              onClick={loadOrders}
              className="mt-5 rounded-xl bg-[#31583B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B]"
            >
              Try again
            </button>
          </section>
        )}

        {/* Empty state */}
        {!loading && !error && orders.length === 0 && (
          <section className="rounded-2xl border border-[#E5E2D7] bg-white px-5 py-12 text-center sm:px-10 sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2E8] text-3xl">
              <span aria-hidden="true">🌿</span>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#71816A]">
              A fresh start
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#263F2B] sm:text-3xl">
              Your order story starts here
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-600">
              You haven&apos;t placed an order yet. Explore our collection of
              thoughtfully selected organic products.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#31583B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B]"
            >
              Explore products
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </section>
        )}

        {/* Order list */}
        {!loading && !error && orders.length > 0 && (
          <section aria-label="Your orders" className="space-y-4">
            {orders.map((order) => {
              const itemCount = Array.isArray(order.items)
                ? order.items.length
                : 0;

              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-[#E5E2D7] bg-white transition duration-200 hover:border-[#C8D4C1] hover:shadow-[0_8px_28px_rgba(38,63,43,0.06)]"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                          Order placed
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#263F2B]">
                          {formatDate(order.createdAt)}
                        </p>

                        <p className="mt-4 text-xs font-medium text-stone-500">
                          Order ID
                        </p>

                        <p className="mt-1 break-all font-mono text-xs leading-5 text-stone-600 sm:text-sm">
                          {order._id}
                        </p>
                      </div>

                      <div className="flex flex-row items-start justify-between gap-4 border-t border-stone-100 pt-4 sm:min-w-40 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                        <div className="sm:text-right">
                          <p className="text-xs text-stone-500">
                            Order total
                          </p>

                          <p className="mt-1 text-xl font-semibold tracking-tight text-[#263F2B] sm:text-2xl">
                            {formatCurrency(order.total)}
                          </p>
                        </div>

                        <StatusBadge status={order.orderStatus} />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-stone-100 pt-4 text-sm text-stone-600">
                      <span>
                        {itemCount} {itemCount === 1 ? "product line" : "product lines"}
                      </span>

                      <span
                        className="hidden h-1 w-1 rounded-full bg-stone-300 sm:block"
                        aria-hidden="true"
                      />

                      <StatusBadge
                        status={order.paymentStatus}
                        label="Payment"
                      />
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-5 text-stone-500">
                        Need a closer look? Check your order information and
                        items.
                      </p>

                      <Link
                        to={`/orders/${order._id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#31583B] px-5 py-3 text-sm font-semibold text-[#31583B] transition hover:bg-[#31583B] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B] sm:w-auto"
                      >
                        View order details
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Continue shopping */}
        {!loading && !error && orders.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#47644B] transition hover:text-[#263F2B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#47644B]"
            >
              Continue shopping
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default OrdersPage;

