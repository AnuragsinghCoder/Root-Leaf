import { useCallback, useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import { getList } from "../../utils/adminResponse";

const statuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminApi.getAdminOrders();
      setOrders(getList(response, "orders"));
    } catch (err) {
      setError(err.message || "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  async function changeStatus(order, orderStatus) {
    if (orderStatus === order.orderStatus) return;

    setBusyId(order._id);
    setError("");
    setSuccess("");

    try {
      await adminApi.updateOrderStatus(order._id, orderStatus);
      setSuccess("Order status updated.");
      await loadOrders();
    } catch (err) {
      setError(err.message || "Could not update order status.");
    } finally {
      setBusyId("");
    }
  }

  const formatMoney = (amount) =>
    (amount / 100).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="mt-1 text-sm text-slate-600">
          Review orders and manage fulfillment status.
        </p>
      </div>

      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
      {success && <p role="status" className="rounded-lg bg-green-50 p-3 text-green-700">{success}</p>}

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Order status</th>
              <th className="p-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-4">Loading orders…</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={6} className="p-4">No orders found.</td></tr>
            ) : orders.map((order) => (
              <tr key={order._id} className="border-t align-top">
                <td className="p-3">
                  <span className="font-medium">{order._id}</span>
                  <p className="text-xs text-slate-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </td>
                <td className="p-3">
                  {order.user?.name || "Customer"}
                  <p className="text-xs text-slate-500">
                    {order.user?.email || ""}
                  </p>
                </td>
                <td className="p-3">{formatMoney(order.total ?? 0)}</td>
                <td className="p-3">{order.paymentStatus}</td>
                <td className="p-3">
                  <select
                    value={order.orderStatus}
                    disabled={busyId === order._id}
                    onChange={(event) => changeStatus(order, event.target.value)}
                    className="max-w-40 rounded-lg border px-2 py-2"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-700 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <section className="space-y-3 rounded-xl border bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Order details</h2>
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="rounded-lg border px-3 py-1"
            >
              Close
            </button>
          </div>

          <p className="break-all text-sm">Order ID: {selectedOrder._id}</p>
          <p className="text-sm">Status: {selectedOrder.orderStatus}</p>

          <h3 className="font-medium">Items</h3>
          <ul className="space-y-2">
            {(selectedOrder.items ?? []).map((item, index) => (
              <li key={`${item.product ?? item.name}-${index}`} className="flex justify-between gap-4 text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatMoney(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <p className="font-semibold">Total: {formatMoney(selectedOrder.total ?? 0)}</p>

          {selectedOrder.shippingAddress && (
            <div className="text-sm text-slate-600">
              <h3 className="font-medium text-slate-900">Shipping address</h3>
              <p>{selectedOrder.shippingAddress.fullName}</p>
              <p>{selectedOrder.shippingAddress.addressLine}</p>
              <p>
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.state}{" "}
                {selectedOrder.shippingAddress.postalCode}
              </p>
            </div>
          )}
        </section>
      )}
    </section>
  );
}