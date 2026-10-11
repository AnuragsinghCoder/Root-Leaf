import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import  useAuth  from "../../hooks/useAuth";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:px-6">
        <Link to="/admin" className="font-semibold">
          Admin Panel
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-600 sm:inline">
            {user?.name}
          </span>

          <Link
            to="/"
            className="text-sm text-slate-700 hover:underline"
          >
            View store
          </Link>

          <button
            type="button"
            onClick={logout}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="md:flex md:min-h-[calc(100vh-57px)]">
        <AdminSidebar />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}