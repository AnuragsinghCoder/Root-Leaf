
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminApi from "../../services/adminApi";
import { getList } from "../../utils/adminResponse";

const quickLinks = [
  {
    title: "Manage products",
    description: "Review your catalog and update product information.",
    to: "/admin/products",
    icon: "▦",
  },
  {
    title: "Manage orders",
    description: "Review customer orders and update their status.",
    to: "/admin/orders",
    icon: "↗",
  },
  {
    title: "Manage users",
    description: "View the user management section.",
    to: "/admin/users",
    icon: "♙",
  },
];

function StatCard({ label, value, description, icon, accent = "green" }) {
  const accents = {
    green: "bg-[#EAF0E5] text-[#31583B]",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-red-50 text-red-700",
    stone: "bg-stone-100 text-stone-700",
  };

  return (
    <article className="rounded-2xl border border-[#E5E2D7] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-stone-500">{label}</p>

          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#263F2B]">
            {value}
          </p>
        </div>

        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${accents[accent]}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-stone-500">{description}</p>
    </article>
  );
}

function StatSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl border border-[#E5E2D7] bg-white p-6"
      aria-hidden="true"
    >
      <div className="h-4 w-28 rounded bg-stone-200" />
      <div className="mt-4 h-9 w-16 rounded bg-stone-200" />
      <div className="mt-4 h-3 w-36 max-w-full rounded bg-stone-100" />
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [productResponse, orderResponse] = await Promise.all([
        adminApi.getProducts({ limit: "50" }),
        adminApi.getAdminOrders(),
      ]);

      const products = getList(productResponse, "products");
      const orders = getList(orderResponse, "orders");

      setStats({
        productsLoaded: products.length,
        ordersLoaded: orders.length,
        pendingOrders: orders.filter(
          (order) => order.orderStatus === "pending"
        ).length,
        lowStock: products.filter(
          (product) => product.isActive && Number(product.stock) <= 5
        ).length,
      });
    } catch (err) {
      setStats(null);
      setError(
        err.message ||
          "Dashboard data could not be loaded. Check admin API access."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <section className="min-w-0 space-y-8 text-stone-800">
      {/* Dashboard heading */}
      <header className="overflow-hidden rounded-2xl border border-[#DCE4D7] bg-[#F0F2E8] p-5 sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816A]">
              Root & Leaf · Administration
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#263F2B] sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
              A clear overview of your product catalog, incoming orders, and
              inventory that may need attention.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDashboard}
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#C8D4C1] bg-white px-4 py-3 text-sm font-semibold text-[#31583B] transition hover:bg-[#F9FBF6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span aria-hidden="true">↻</span>
            {loading ? "Refreshing..." : "Refresh overview"}
          </button>
        </div>
      </header>

      {/* Error state */}
      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-white p-5 sm:p-6"
        >
          <h2 className="font-semibold text-red-800">
            Dashboard data unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-red-700">{error}</p>

          <button
            type="button"
            onClick={loadDashboard}
            disabled={loading}
            className="mt-4 rounded-xl bg-[#31583B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#25462E] disabled:opacity-60"
          >
            Try again
          </button>
        </div>
      )}

      {/* Statistics */}
      <section aria-labelledby="overview-heading">
        <div className="mb-4">
          <h2
            id="overview-heading"
            className="text-lg font-semibold text-[#263F2B]"
          >
            Store overview
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            A snapshot of the records returned by your current APIs.
          </p>
        </div>

        {loading ? (
          <div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            role="status"
            aria-label="Loading dashboard statistics"
          >
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        ) : stats ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Products loaded"
              value={stats.productsLoaded}
              description="Products returned by the current catalog request."
              icon="▦"
              accent="green"
            />

            <StatCard
              label="Orders loaded"
              value={stats.ordersLoaded}
              description="Orders returned by the current admin request."
              icon="▤"
              accent="stone"
            />

            <StatCard
              label="Pending orders"
              value={stats.pendingOrders}
              description="Returned orders with a pending status."
              icon="◷"
              accent="amber"
            />

            <StatCard
              label="Low-stock products"
              value={stats.lowStock}
              description="Active products with stock of five units or fewer."
              icon="!"
              accent={stats.lowStock > 0 ? "red" : "green"}
            />
          </div>
        ) : !error ? (
          <div className="rounded-2xl border border-[#E5E2D7] bg-white p-6">
            <p className="text-sm text-stone-600">
              Statistics are currently unavailable.
            </p>
          </div>
        ) : null}

        <p className="mt-4 text-xs leading-5 text-stone-500">
          These are returned-record counts, not guaranteed all-time totals.
          Product pagination and order API behavior may limit the records
          included in these figures.
        </p>
      </section>

      {/* Quick navigation */}
      <section aria-labelledby="management-heading">
        <div className="mb-4">
          <h2
            id="management-heading"
            className="text-lg font-semibold text-[#263F2B]"
          >
            Store management
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Jump directly to the section you want to manage.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-2xl border border-[#E5E2D7] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#C8D4C1] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31583B] sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF0E5] text-xl text-[#31583B]"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <span
                  className="text-lg text-[#71816A] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>

              <h3 className="mt-5 font-semibold text-[#263F2B]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Inventory attention */}
      {!loading && stats && (
        <section className="rounded-2xl border border-[#E5E2D7] bg-white p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF0E5] text-xl text-[#31583B]"
              aria-hidden="true"
            >
              ♧
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-[#263F2B]">
                Inventory check
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                {stats.lowStock > 0
                  ? `${stats.lowStock} active product${stats.lowStock === 1 ? "" : "s"} in the returned catalog have five or fewer units in stock. Review inventory before replenishment is needed.`
                  : "No active low-stock products were detected in the returned catalog."}
              </p>

              <Link
                to="/admin/products"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#31583B] hover:text-[#25462E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#31583B]"
              >
                Review products
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
