import { Link } from "react-router-dom";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

function CartSummary({ totalItems, totalAmount }) {
  return (
    <aside className="h-fit rounded-2xl border border-[#e7e4d9] bg-white p-5 shadow-[0_6px_24px_rgba(36,59,42,0.04)] sm:p-6 lg:sticky lg:top-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6c815e]">
        Almost yours
      </p>

      <h2 className="mt-2 text-xl font-semibold text-[#243b2a]">
        Order summary
      </h2>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm">
        <span className="text-[#777c6d]">
          Items ({totalItems})
        </span>
        <span className="font-medium text-[#243b2a]">
          {formatCurrency(totalAmount)}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4 border-t border-[#e5e3d7] pt-4 text-sm">
        <div>
          <p className="font-semibold text-[#243b2a]">
            Total
          </p>
          <p className="mt-1 text-xs leading-5 text-[#777c6d]">
            Before any checkout adjustments
          </p>
        </div>

        <p className="text-xl font-semibold tracking-tight text-[#315c3b]">
          {formatCurrency(totalAmount)}
        </p>
      </div>

      <Link
        to="/checkout"
        className="mt-6 flex min-h-13 w-full items-center justify-center rounded-full bg-[#315c3b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24482e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b]"
      >
        Continue to checkout
        <span className="ml-2" aria-hidden="true">
          →
        </span>
      </Link>

      <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#f4f5ec] p-3.5">
        <span className="text-lg text-[#52734a]" aria-hidden="true">
          ♧
        </span>
        <p className="text-xs leading-5 text-[#66705e]">
          Shipping costs and the final payable amount are confirmed during
          checkout.
        </p>
      </div>
    </aside>
  );
}

export default CartSummary;