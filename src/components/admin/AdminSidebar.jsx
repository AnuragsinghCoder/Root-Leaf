import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full shrink-0 border-b bg-white p-4 md:min-h-full md:w-60 md:border-b-0 md:border-r">
      <h2 className="mb-4 text-lg font-bold">Store Admin</h2>

      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}