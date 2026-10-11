export default function Loading({ label = "Loading…" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-40 items-center justify-center gap-3 p-6 text-sm text-slate-600"
    >
      <span
        aria-hidden="true"
        className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900 motion-reduce:animate-none"
      />
      <span>{label}</span>
    </div>
  );
}