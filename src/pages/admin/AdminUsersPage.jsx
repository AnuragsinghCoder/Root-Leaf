
const plannedCapabilities = [
  {
    number: "01",
    title: "Customer directory",
    description:
      "View customer accounts and relevant profile information from the protected admin API.",
  },
  {
    number: "02",
    title: "Search and filters",
    description:
      "Find customer accounts quickly once the backend supports listing and filtering users.",
  },
  {
    number: "03",
    title: "Account management",
    description:
      "Manage account access only after the required backend permissions and actions are implemented.",
  },
];

export default function AdminUsersPage() {
  return (
    <section className="space-y-7 text-[#263e2b]">
      {/* Page heading */}
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71816c]">
          Root & Leaf / Administration
        </p>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#203b28] sm:text-4xl">
              Customer management
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#71816c]">
              Manage customer accounts and keep your store's customer
              experience running smoothly.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Setup required
          </span>
        </div>
      </header>

      {/* Main status panel */}
      <div className="overflow-hidden rounded-2xl border border-[#dfe6d8] bg-white shadow-sm">
        <div className="h-1.5 bg-[#527b4d]" />

        <div className="p-6 sm:p-9">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf2e7] text-[#426746]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>

          <div className="mt-6 max-w-2xl">
            <h2 className="text-xl font-semibold text-[#203b28] sm:text-2xl">
              Customer management is not connected yet
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#71816c]">
              Your current backend does not provide a protected admin
              endpoint for listing or managing customer accounts. This
              page is ready for the next development step, but it does
              not fetch or display customer data yet.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-[#e6e8dc] bg-[#faf9f3] p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#527b4d] shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#36553b]">
                Protected backend endpoint required
              </p>
              <p className="mt-1 text-xs leading-5 text-[#71816c]">
                Customer information should only be returned to
                authorized administrators.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Planned capabilities */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#203b28]">
            Planned capabilities
          </h2>
          <p className="mt-1 text-sm text-[#71816c]">
            These features can be implemented after the backend contract
            is established.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plannedCapabilities.map((capability) => (
            <article
              key={capability.number}
              className="rounded-2xl border border-[#e6e8dc] bg-white p-5 transition hover:border-[#c9d7c2] hover:shadow-sm sm:p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2e7] text-sm font-semibold text-[#426746]">
                {capability.number}
              </span>

              <h3 className="mt-5 font-semibold text-[#263e2b]">
                {capability.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#71816c]">
                {capability.description}
              </p>

              <div className="mt-5 border-t border-[#edf0e8] pt-4">
                <span className="text-xs font-medium text-[#899286]">
                  Requires backend support
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="text-xs leading-5 text-[#899286]">
        No customer records or account-management actions are simulated
        on this page.
      </p>
    </section>
  );
}
