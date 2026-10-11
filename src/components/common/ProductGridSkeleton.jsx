export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      aria-label="Loading products"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border bg-white p-3"
        >
          <div className="aspect-square animate-pulse rounded-lg bg-slate-200 motion-reduce:animate-none" />
          <div className="mt-4 h-4 w-4/5 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
          <div className="mt-2 h-4 w-2/5 animate-pulse rounded bg-slate-200 motion-reduce:animate-none" />
          <div className="mt-4 h-10 animate-pulse rounded-lg bg-slate-100 motion-reduce:animate-none" />
        </div>
      ))}
    </div>
  );
}