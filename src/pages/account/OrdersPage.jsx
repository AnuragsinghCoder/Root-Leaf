
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderApi from "../../services/orderApi";

function getPayload(response) {
  return response?.data ?? response;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format((amount ?? 0) / 100);
}

function formatDate(date) {
  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? "Date unavailable"
    : parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
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
        err?.message || "Unable to load your orders. Please retry."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {loading && (
        <p className="mt-6" role="status">Loading your orders…</p>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-lg border border-red-200 p-4" role="alert">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={loadOrders}
            className="mt-2 underline"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="mt-6 rounded-xl border p-8 text-center">
          <h2 className="font-semibold">No orders yet</h2>
          <p className="mt-2 text-gray-600">
            Your completed order requests will appear here.
          </p>
          <Link to="/products" className="mt-4 inline-block underline">
            Browse products
          </Link>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-xl border p-5"
            >
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-600">
                    Order placed {formatDate(order.createdAt)}
                  </p>
                  <p className="mt-1 break-all text-sm">
                    Order ID: {order._id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="mt-1 text-sm capitalize">
                    {order.orderStatus}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                {order.items?.length ?? 0} product line(s)
                {" · "}
                Payment: {order.paymentStatus || "pending"}
              </p>

              <Link
                to={`/orders/${order._id}`}
                className="mt-4 inline-block font-medium underline"
              >
                View order details
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default OrdersPage;
