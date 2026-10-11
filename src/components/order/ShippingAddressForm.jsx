
const fields = [
  { name: "fullName", label: "Full name", autoComplete: "name" },
  { name: "phone", label: "Phone number", autoComplete: "tel" },
  { name: "addressLine", label: "Address", autoComplete: "street-address" },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "state", label: "State", autoComplete: "address-level1" },
  { name: "postalCode", label: "Postal code", autoComplete: "postal-code" },
  { name: "country", label: "Country", autoComplete: "country-name" }
];

function ShippingAddressForm({
  value,
  onChange,
  onSubmit,
  disabled,
  children
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const address = Object.fromEntries(
      fields.map(({ name }) => [
        name,
        String(value[name] || "").trim()
      ])
    );

    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Shipping address</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ name, label, autoComplete }) => (
          <label
            key={name}
            className={`block space-y-1 ${
              name === "addressLine" ? "sm:col-span-2" : ""
            }`}
          >
            <span className="text-sm font-medium">{label}</span>
            <input
              name={name}
              type="text"
              autoComplete={autoComplete}
              required
              maxLength={name === "addressLine" ? 250 : 100}
              value={value[name] || ""}
              disabled={disabled}
              onChange={(event) =>
                onChange(name, event.target.value)
              }
              className="w-full rounded-lg border px-3 py-2 disabled:bg-gray-100"
            />
          </label>
        ))}
      </div>
      {children}
    </form>
  );
}

export default ShippingAddressForm;

