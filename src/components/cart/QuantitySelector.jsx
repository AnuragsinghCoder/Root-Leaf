function QuantitySelector({
  quantity,
  stock,
  disabled = false,
  onChange,
}) {
  const canDecrease = quantity > 1;
  const canIncrease = quantity < stock;

  return (
    <div
      className="inline-flex items-center gap-3 rounded-full border border-[#dfe3d5] bg-[#faf8f1] p-1"
      aria-label="Product quantity"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || !canDecrease}
        onClick={() => onChange(quantity - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#315c3b] transition hover:bg-[#e8eee0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c3b] disabled:cursor-not-allowed disabled:opacity-35"
      >
        -
      </button>

      <span
        className="min-w-6 text-center text-sm font-semibold text-[#243b2a]"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || !canIncrease}
        onClick={() => onChange(quantity + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#315c3b] transition hover:bg-[#e8eee0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c3b] disabled:cursor-not-allowed disabled:opacity-35"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;