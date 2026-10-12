const fields = [
  {
    name: "fullName",
    label: "Full name",
    autoComplete: "name",
    placeholder: "Enter your full name",
  },
  {
    name: "phone",
    label: "Phone number",
    autoComplete: "tel",
    placeholder: "Enter your phone number",
    type: "tel",
  },
  {
    name: "addressLine",
    label: "Street address",
    autoComplete: "street-address",
    placeholder: "House number, street, area",
  },
  {
    name: "city",
    label: "City",
    autoComplete: "address-level2",
    placeholder: "Enter your city",
  },
  {
    name: "state",
    label: "State",
    autoComplete: "address-level1",
    placeholder: "Enter your state",
  },
  {
    name: "postalCode",
    label: "Postal code",
    autoComplete: "postal-code",
    placeholder: "Enter your postal code",
  },
  {
    name: "country",
    label: "Country",
    autoComplete: "country-name",
    placeholder: "Enter your country",
  },
];

function ShippingAddressForm({
  value,
  onChange,
  onSubmit,
  disabled,
  children,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const address = Object.fromEntries(
      fields.map(({ name }) => [
        name,
        String(value[name] || "").trim(),
      ])
    );

    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        {fields.map(
          ({
            name,
            label,
            autoComplete,
            placeholder,
            type = "text",
          }) => (
            <div
              key={name}
              className={
                name === "addressLine" ? "sm:col-span-2" : ""
              }
            >
              <label
                htmlFor={`shipping-${name}`}
                className="mb-2 block text-sm font-medium text-[#344735]"
              >
                {label}
                <span className="ml-1 text-red-600" aria-hidden="true">
                  *
                </span>
              </label>

              <input
                id={`shipping-${name}`}
                name={name}
                type={type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                required
                maxLength={name === "addressLine" ? 250 : 100}
                value={value[name] || ""}
                disabled={disabled}
                onChange={(event) =>
                  onChange(name, event.target.value)
                }
                className="min-h-12 w-full rounded-xl border border-[#dedfd3] bg-[#fdfdf9] px-4 py-3 text-sm text-[#243b2a] outline-none transition placeholder:text-[#a0a394] hover:border-[#aebba5] focus:border-[#52734a] focus:ring-4 focus:ring-[#52734a]/10 disabled:cursor-not-allowed disabled:bg-[#f1f1ec] disabled:opacity-70"
              />
            </div>
          )
        )}
      </div>

      {children}
    </form>
  );
}

export default ShippingAddressForm;
