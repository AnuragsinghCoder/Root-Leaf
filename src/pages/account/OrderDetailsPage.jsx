
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    : parsed.toLocaleString("en-IN");
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
      setError(
        err?.message || "Unable to load this order."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p role="status">Loading order details…</p>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold">Order details</h1>
        <p className="mt-4 text-red-700" role="alert">
          {error || "Order not found."}
        </p>
        <div className="mt-4 flex gap-4">
          <button type="button" onClick={loadOrder} className="underline">
            Retry
          </button>
          <Link to="/orders" className="underline">
            My Orders
          </Link>
        </div>
      </main>
    );
  }

  const address = order.shippingAddress;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Order details</h1>
          <p className="mt-2 break-all text-sm text-gray-600">
            Order ID: {order._id}
          </p>
        </div>

        <span className="rounded-full border px-3 py-1 text-sm capitalize">
          {order.orderStatus}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Placed on {formatDate(order.createdAt)}
      </p>

      <section className="mt-8 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Items ordered</h2>

        <div className="mt-4 divide-y">
          {order.items?.map((item, index) => (
            <div
              key={item.product?._id || item.product || `${item.name}-${index}`}
              className="flex justify-between gap-4 py-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-sm text-gray-600">
                  {formatCurrency(item.price)} × {item.quantity}
                </p>
              </div>

              <p className="shrink-0 font-medium">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2 border-t pt-4">
          <div className="flex justify-between gap-4">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Shipping</span>
            <span>{formatCurrency(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between gap-4 text-lg font-bold">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </section>

      {address && (
        <section className="mt-6 rounded-xl border p-5">
          <h2 className="text-lg font-semibold">Shipping address</h2>
          <address className="mt-3 not-italic leading-6">
            {address.fullName}<br />
            {address.phone}<br />
            {address.addressLine}<br />
            {address.city}, {address.state} {address.postalCode}<br />
            {address.country}
          </address>
        </section>
      )}

      <section className="mt-6 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Payment status</h2>
        <p className="mt-2 capitalize">
          {order.paymentStatus || "pending"}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Online payment is not enabled in this phase.
        </p>
      </section>

      <Link to="/orders" className="mt-6 inline-block underline">
        Back to My Orders
      </Link>
    </main>
  );
}

export default OrderDetailsPage;
