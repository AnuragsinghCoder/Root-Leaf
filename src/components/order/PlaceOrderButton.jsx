function PlaceOrderButton({ loading, disabled }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      aria-busy={loading}
      className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#315c3b] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#24482e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b] disabled:cursor-not-allowed disabled:bg-[#aab6a2] disabled:shadow-none"
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      )}

      {loading ? "Placing your order..." : "Place order"}

      {!loading && (
        <span aria-hidden="true">
          →
        </span>
      )}
    </button>
  );
}

export default PlaceOrderButton;
