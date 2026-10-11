import { Link } from "react-router-dom";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <section className="rounded-xl border border-dashed bg-white px-5 py-10 text-center">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          {description}
        </p>
      )}

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          {actionLabel}
        </button>
      )}
    </section>
  );
}