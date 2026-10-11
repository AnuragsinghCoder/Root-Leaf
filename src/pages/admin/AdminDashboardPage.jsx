import { useEffect, useState } from "react";
import adminApi from "../../services/adminApi";
import { getList } from "../../utils/adminResponse";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const [productResponse, orderResponse] = await Promise.all([
          adminApi.getProducts({ limit: "50" }),
          adminApi.getAdminOrders(),
        ]);

        if (cancelled) return;

        const products = getList(productResponse, "products");
        const orders = getList(orderResponse, "orders");

        setStats({
          productsLoaded: products.length,
          ordersLoaded: orders.length,
          pendingOrders: orders.filter(
            (order) => order.orderStatus === "pending"
          ).length,
          lowStock: products.filter(
            (product) =>
              product.isActive && Number(product.stock) <= 5
          ).length,
        });
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
              "Dashboard data could not be loaded. Check admin API access."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = stats
    ? [
        ["Products loaded", stats.productsLoaded],
        ["Orders loaded", stats.ordersLoaded],
        ["Pending orders", stats.pendingOrders],
        ["Low-stock products", stats.lowStock],
      ]
    : [];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          A quick overview of catalog and order activity.
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading dashboard…</p>
      ) : stats ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(([label, value]) => (
            <article key={label} className="rounded-xl border bg-white p-5">
              <p className="text-sm text-slate-600">{label}</p>
              <p className="mt-2 text-3xl font-bold">{value}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border bg-white p-4">
          Statistics are unavailable.
        </p>
      )}

      <p className="text-xs text-slate-500">
        These figures describe the records returned by the current API calls.
        They are not guaranteed to represent the complete catalog or all-time
        order totals when the APIs paginate results.
      </p>
    </section>
  );
}