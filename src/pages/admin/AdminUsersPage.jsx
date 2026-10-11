export default function AdminUsersPage() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="mt-1 text-sm text-slate-600">
          Customer account management.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h2 className="font-semibold">User management isn't connected yet</h2>
        <p className="mt-2 text-sm text-slate-600">
          The current backend contract doesn't provide an admin user-list or
          user-management endpoint. Add a protected backend endpoint before
          displaying customer records here.
        </p>
      </div>
    </section>
  );
}