function ProductSort({ value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        htmlFor="product-sort"
        className="text-sm font-medium text-[#657366]"
      >
        Sort by
      </label>

      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 min-w-40 rounded-full border border-[#DCDDCF] bg-white px-4 py-2.5 text-sm font-medium text-[#315B3C] outline-none transition focus:border-[#56764E] focus:ring-2 focus:ring-[#DCE7D5]"
      >
        <option value="-createdAt">Newest first</option>
        <option value="price">Price: Low to High</option>
        <option value="-price">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
        <option value="-name">Name: Z to A</option>
      </select>
    </div>
  );
}

export default ProductSort;