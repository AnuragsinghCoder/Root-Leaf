
import { useCallback, useEffect, useMemo, useState } from "react";
import adminApi from "../../services/adminApi";
import { getList } from "../../utils/adminResponse";

const statusTransitions = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

const statusStyles = {
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
  confirmed: "bg-sky-50 text-sky-800 ring-sky-200",
  processing: "bg-violet-50 text-violet-800 ring-violet-200",
  shipped: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  delivered: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  cancelled: "bg-red-50 text-red-800 ring-red-200",
};

function formatMoney(amount = 0) {
  return (Number(amount || 0) / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? "Date unavailable"
    : parsed.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function getCustomerName(order) {
  return order.user?.name || order.shippingAddress?.fullName || "Customer";
}

function getOrderItems(order) {
  return Array.isArray(order.items) ? order.items : [];
}

function getItemName(item) {
  return item.product?.name || item.name || "Product";
}

function getItemPrice(item) {
  return Number(item.price ?? item.priceAtPurchase ?? 0);
}

function StatusBadge({ status }) {
  const normalized = status || "unknown";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
        statusStyles[normalized] || "bg-slate-100 text-slate-700 ring-slate-200"
      }`}
    >
      {normalized}
    </span>
  );
}

function OrderStatusControl({ order, busy, onChange }) {
  const currentStatus = order.orderStatus || "pending";
  const availableStatuses = [
    currentStatus,
    ...(statusTransitions[currentStatus] || []),
  ];

  return (
    <div className="min-w-40 space-y-2">
      <StatusBadge status={currentStatus} />

      <select
        aria-label={`Update status for order ${order._id}`}
        value={currentStatus}
        disabled={busy}
        onChange={(event) => onChange(order, event.target.value)}
        className="w-full rounded-xl border border-[#dce4d7] bg-white px-3 py-2.5 text-sm capitalize text-[#263e2b] outline-none transition focus:border-[#527b4d] focus:ring-2 focus:ring-[#527b4d]/20 disabled:cursor-wait disabled:opacity-60"
      >
        {availableStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {busy && (
        <p className="text-xs text-[#527b4d]" role="status">
          Updating status…
        </p>
      )}
    </div>
  );
}

function StatCard({ label, value, description, icon }) {
  return (
    <div className="rounded-2xl border border-[#e6e8dc] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#687568]">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#203b28]">
            {value}
          </p>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf2e7] text-lg text-[#426746]">
          {icon}
        </span>
      </div>

      <p className="mt-3 text-xs text-[#7b8578]">{description}</p>
    </div>
  );
}

function OrderDetails({ order, onClose }) {
  const items = getOrderItems(order);
  const address = order.shippingAddress;

  return (
    <div
      className="rounded-2xl border border-[#dce5d7] bg-white p-5 shadow-sm sm:p-7"
      aria-labelledby="order-details-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#71816c]">
            Order overview
          </p>

          <h2
            id="order-details-heading"
            className="mt-2 text-xl font-semibold text-[#203b28]"
          >
            Order details
          </h2>

          <p className="mt-2 break-all text-sm text-[#7b8578]">
            ID: {order._id}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-[#dce4d7] px-4 py-2 text-sm font-medium text-[#36553b] transition hover:bg-[#f3f5ed] focus:outline-none focus:ring-2 focus:ring-[#527b4d]"
        >
          Close
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-[#f7f6ef] p-4">
          <p className="text-xs text-[#71816c]">Customer</p>
          <p className="mt-1 font-semibold text-[#263e2b]">
            {getCustomerName(order)}
          </p>
          <p className="mt-1 break-all text-sm text-[#71816c]">
            {order.user?.email || ""}
          </p>
        </div>

        <div className="rounded-xl bg-[#f7f6ef] p-4">
          <p className="text-xs text-[#71816c]">Order date</p>
          <p className="mt-1 font-semibold text-[#263e2b]">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="rounded-xl bg-[#f7f6ef] p-4">
          <p className="text-xs text-[#71816c]">Payment status</p>
          <p className="mt-1 font-semibold capitalize text-[#263e2b]">
            {order.paymentStatus || "Unknown"}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <h3 className="font-semibold text-[#263e2b]">Items ordered</h3>

        {items.length === 0 ? (
          <p className="mt-3 rounded-xl bg-[#f7f6ef] p-4 text-sm text-[#71816c]">
            No item details are available for this order.
          </p>
        ) : (
          <div className="mt-3 divide-y divide-[#edf0e8] rounded-xl border border-[#edf0e8]">
            {items.map((item, index) => (
              <div
                key={`${item.product?._id || item.product || item.name || "item"}-${index}`}
                className="flex items-start justify-between gap-4 p-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-[#263e2b]">
                    {getItemName(item)}
                  </p>
                  <p className="mt-1 text-sm text-[#71816c]">
                    Quantity: {item.quantity ?? 0}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-medium text-[#263e2b]">
                  {formatMoney(
                    getItemPrice(item) * Number(item.quantity || 0)
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {address && (
        <div className="mt-7">
          <h3 className="font-semibold text-[#263e2b]">
            Shipping address
          </h3>

          <div className="mt-3 rounded-xl border border-[#edf0e8] p-4 text-sm leading-6 text-[#586a57]">
            <p className="font-medium text-[#263e2b]">
              {address.fullName}
            </p>
            <p>{address.phone}</p>
            <p>{address.addressLine}</p>
            <p>
              {[address.city, address.state, address.postalCode]
                .filter(Boolean)
                .join(", ")}
            </p>
            <p>{address.country}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#e6e8dc] pt-5">
        <span className="font-medium text-[#586a57]">Order total</span>
        <span className="text-xl font-semibold text-[#203b28]">
          {formatMoney(order.total ?? 0)}
        </span>
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  async function changeStatus(order, status) {
    if (status === order.orderStatus || busyId) return;

    const permitted = statusTransitions[order.orderStatus] || [];

    if (!permitted.includes(status)) {
      setError(
        `Changing an order from ${order.orderStatus} to ${status} is not permitted.`
      );
      return;
    }

    setBusyId(order._id);
    setError("");
    setSuccess("");

    try {
      await adminApi.updateOrderStatus(order._id, status);

      setSuccess("Order status updated successfully.");
      await loadOrders();
    } catch (err) {
      setError(err.message || "Could not update order status.");
    } finally {
      setBusyId("");
    }
  }

  const counts = useMemo(() => {
    const count = (status) =>
      orders.filter((order) => order.orderStatus === status).length;

    return {
      total: orders.length,
      pending: count("pending"),
      processing: count("processing"),
      shipped: count("shipped"),
      delivered: count("delivered"),
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.orderStatus === statusFilter;

      const matchesSearch =
        !query ||
        [
          order._id,
          getCustomerName(order),
          order.user?.email,
          order.paymentStatus,
        ].some((value) => String(value || "").toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  return (
    <section className="space-y-7 text-[#263e2b]">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816c]">
            Root & Leaf / Administration
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#203b28] sm:text-4xl">
            Order management
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#71816c]">
            Track customer orders and manage each step of fulfillment.
          </p>
        </div>

        <button
          type="button"
          onClick={loadOrders}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#dce4d7] bg-white px-4 py-3 text-sm font-semibold text-[#36553b] shadow-sm transition hover:bg-[#f3f5ed] disabled:opacity-60 sm:self-auto"
        >
          <span aria-hidden="true">↻</span>
          {loading ? "Refreshing…" : "Refresh orders"}
        </button>
      </header>

      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            className="font-semibold underline underline-offset-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <span>{success}</span>
          <button
            type="button"
            onClick={() => setSuccess("")}
            className="font-semibold underline underline-offset-2"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total orders"
          value={counts.total}
          description="Orders returned by the API"
          icon="▤"
        />
        <StatCard
          label="Awaiting confirmation"
          value={counts.pending}
          description="Orders needing initial review"
          icon="◷"
        />
        <StatCard
          label="Processing"
          value={counts.processing}
          description="Orders being prepared"
          icon="↗"
        />
        <StatCard
          label="Shipped"
          value={counts.shipped}
          description="Orders on their way"
          icon="➜"
        />
      </div>

      <div className="rounded-2xl border border-[#e6e8dc] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#203b28]">
              All orders
            </h2>
            <p className="mt-1 text-sm text-[#71816c]">
              {filteredOrders.length} of {orders.length} orders shown
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[540px]">
            <div>
              <label
                htmlFor="order-search"
                className="mb-1.5 block text-xs font-semibold text-[#586a57]"
              >
                Search orders
              </label>
              <input
                id="order-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Order ID, customer, email…"
                className="w-full rounded-xl border border-[#dce4d7] bg-[#fffefa] px-4 py-3 text-sm outline-none transition placeholder:text-[#9aa395] focus:border-[#527b4d] focus:ring-2 focus:ring-[#527b4d]/20"
              />
            </div>

            <div>
              <label
                htmlFor="order-status-filter"
                className="mb-1.5 block text-xs font-semibold text-[#586a57]"
              >
                Filter by status
              </label>
              <select
                id="order-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-xl border border-[#dce4d7] bg-[#fffefa] px-4 py-3 text-sm capitalize outline-none focus:border-[#527b4d] focus:ring-2 focus:ring-[#527b4d]/20"
              >
                <option value="all">All statuses</option>
                {Object.keys(statusTransitions).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-5 space-y-3" aria-label="Loading orders">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-xl bg-[#f0f1e9]"
              />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-[#dce4d7] px-5 py-14 text-center">
            <p className="text-lg font-semibold text-[#36553b]">
              {orders.length === 0 ? "No orders yet" : "No matching orders"}
            </p>
            <p className="mt-2 text-sm text-[#71816c]">
              {orders.length === 0
                ? "New customer orders will appear here."
                : "Try another search term or status filter."}
            </p>
            {(search || statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="mt-4 rounded-lg px-3 py-2 text-sm font-semibold text-[#426746] hover:bg-[#edf2e7]"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="mt-5 space-y-3 md:hidden">
              {filteredOrders.map((order) => (
                <article
                  key={order._id}
                  className="rounded-xl border border-[#e6e8dc] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-all text-sm font-semibold text-[#203b28]">
                        #{String(order._id).slice(-8)}
                      </p>
                      <p className="mt-1 text-xs text-[#71816c]">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <StatusBadge status={order.orderStatus} />
                  </div>

                  <div className="mt-4 space-y-1">
                    <p className="font-medium">{getCustomerName(order)}</p>
                    <p className="break-all text-sm text-[#71816c]">
                      {order.user?.email || ""}
                    </p>
                    <p className="pt-2 text-lg font-semibold">
                      {formatMoney(order.total ?? 0)}
                    </p>
                    <p className="text-sm capitalize text-[#71816c]">
                      Payment: {order.paymentStatus || "Unknown"}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-[#edf0e8] pt-4">
                    <OrderStatusControl
                      order={order}
                      busy={busyId === order._id}
                      onChange={changeStatus}
                    />

                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="mt-3 w-full rounded-xl border border-[#dce4d7] px-4 py-2.5 text-sm font-semibold text-[#36553b] transition hover:bg-[#f3f5ed]"
                    >
                      View order details
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead>
                  <tr className="border-y border-[#edf0e8] bg-[#f7f6ef] text-xs uppercase tracking-wide text-[#71816c]">
                    <th className="px-4 py-4 font-semibold">Order</th>
                    <th className="px-4 py-4 font-semibold">Customer</th>
                    <th className="px-4 py-4 font-semibold">Total</th>
                    <th className="px-4 py-4 font-semibold">Payment</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Details</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#edf0e8]">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="align-top transition hover:bg-[#fcfbf6]"
                    >
                      <td className="px-4 py-5">
                        <p className="font-semibold text-[#263e2b]">
                          #{String(order._id).slice(-8)}
                        </p>
                        <p className="mt-1 text-xs text-[#71816c]">
                          {formatDate(order.createdAt)}
                        </p>
                      </td>

                      <td className="max-w-56 px-4 py-5">
                        <p className="font-medium">{getCustomerName(order)}</p>
                        <p className="mt-1 break-all text-xs text-[#71816c]">
                          {order.user?.email || ""}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-5 font-semibold">
                        {formatMoney(order.total ?? 0)}
                      </td>

                      <td className="px-4 py-5">
                        <span className="capitalize text-[#586a57]">
                          {order.paymentStatus || "Unknown"}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        <OrderStatusControl
                          order={order}
                          busy={busyId === order._id}
                          onChange={changeStatus}
                        />
                      </td>

                      <td className="px-4 py-5">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-lg px-3 py-2 font-semibold text-[#426746] transition hover:bg-[#edf2e7] focus:outline-none focus:ring-2 focus:ring-[#527b4d]"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {selectedOrder && (
        <OrderDetails
          order={
            orders.find((order) => order._id === selectedOrder._id) ||
            selectedOrder
          }
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <p className="text-xs leading-5 text-[#899286]">
        Statistics and filters reflect the orders currently returned by the
        admin API. Status changes are validated by the backend.
      </p>
    </section>
  );
}
