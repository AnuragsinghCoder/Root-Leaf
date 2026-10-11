
function PlaceOrderButton({ loading, disabled }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="w-full rounded-lg bg-black px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Placing order…" : "Place order"}
    </button>
  );
}

export default PlaceOrderButton;
