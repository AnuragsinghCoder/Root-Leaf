
import { Link } from "react-router-dom";

const privacySections = [
  {
    number: "01",
    title: "Information we may collect",
    paragraphs: [
      "Depending on how you use Root & Leaf, information may include details you provide when creating an account, information associated with your orders, and messages you send through our contact channels.",
      "The exact information collected depends on the features you use and how the application is configured. We should confirm the fields collected by the backend before publishing a final policy.",
    ],
  },
  {
    number: "02",
    title: "How information is used",
    paragraphs: [
      "Account and order information may be used to support sign-in, manage your account, process purchases, provide order updates, and respond to customer requests.",
      "We should only describe additional purposes, such as marketing or analytics, if Root & Leaf actually uses information for those purposes.",
    ],
  },
  {
    number: "03",
    title: "Authentication and browser storage",
    paragraphs: [
      "The current frontend stores its authentication token in the browser's localStorage. This allows the application to access the token when performing authenticated actions.",
      "Local browser storage is different from cookie-based token storage. Anyone with access to an unlocked browser session may pose a risk to information accessible through that session. Keep your device secure and sign out when using a shared device.",
      "The token's exact lifetime, renewal behavior, and invalidation rules depend on the application's authentication implementation.",
    ],
  },
  {
    number: "04",
    title: "Orders and payments",
    paragraphs: [
      "The store includes account and order-management features. Order information may be processed to manage purchases and display order status.",
      "The payment provider, payment data collected, and whether any payment details are stored by Root & Leaf must be confirmed from the actual checkout and backend implementation. Do not assume that payment information is or is not stored without verifying those details.",
    ],
  },
  {
    number: "05",
    title: "Cookies and similar technologies",
    paragraphs: [
      "The current frontend search identified localStorage operations for authentication. That alone does not establish whether the entire application uses cookies or other tracking technologies.",
      "Any cookies, analytics tools, advertising technologies, or other storage mechanisms should be disclosed here only after the application and its third-party integrations have been reviewed.",
    ],
  },
  {
    number: "06",
    title: "Sharing of information",
    paragraphs: [
      "Information may need to be handled by services that support the store, depending on the integrations actually used. The specific service providers, information shared, and purposes of sharing must be verified before this section is finalized.",
      "This policy should identify applicable recipients and explain any other sharing practices that are relevant to the business.",
    ],
  },
  {
    number: "07",
    title: "Security",
    paragraphs: [
      "We should describe the safeguards actually implemented by the application rather than promise that any system is completely secure.",
      "For better account safety, use a strong, unique password, keep your device and browser updated, and avoid leaving your account signed in on shared devices.",
    ],
  },
  {
    number: "08",
    title: "Data retention and deletion",
    paragraphs: [
      "The period for which account, order, and other information is retained depends on the application's implementation and the business's applicable requirements.",
      "Root & Leaf should confirm its retention and deletion procedures before publishing a specific timeline or promising that information can be deleted immediately.",
    ],
  },
  {
    number: "09",
    title: "Your privacy choices",
    paragraphs: [
      "If you have a question about personal information associated with your account, contact us so your request can be reviewed.",
      "Available rights and the process for making a request may depend on your location and the circumstances. The final policy should identify the applicable process and any relevant legal requirements.",
    ],
  },
  {
    number: "10",
    title: "Updates to this policy",
    paragraphs: [
      "This page should be updated when the store's data practices materially change. The published version should include its effective date and a clear explanation of important changes where appropriate.",
    ],
  },
];

function PrivacyIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-6 w-6",
    "aria-hidden": true,
  };

  if (type === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (type === "lock") {
    return (
      <svg {...common}>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M3 12s3.2-6 9-6 9 6 9 6-3.2 6-9 6-9-6-9-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F0] text-[#263E2B]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E5E6DB] bg-[#F0F1E7]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#D7E0CF] sm:h-[30rem] sm:w-[30rem]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 left-[10%] h-56 w-56 rounded-full bg-[#E3EAD9]/70 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D6DFCE] bg-[#FBF8F0]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#527B4D]">
              <PrivacyIcon type="shield" />
              Your privacy matters
            </div>

            <h1 className="mt-7 font-serif text-4xl leading-tight tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl">
              Your information.
              <span className="block italic text-[#718B62]">
                Treated with care.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#697767] sm:text-base sm:leading-8">
              Learn how information may be handled when you explore
              Root &amp; Leaf, manage your account, or place an order.
              We're committed to making our practices clear.
            </p>

            <a
              href="#privacy-details"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Explore our policy
            </a>
          </div>
        </div>
      </section>

      {/* Privacy principles */}
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:grid-cols-3 sm:px-8 sm:py-14 lg:px-10">
        <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5 sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF1E6] text-[#426746]">
            <PrivacyIcon type="eye" />
          </span>
          <h2 className="mt-4 font-serif text-xl text-[#244B31]">
            Clear information
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            Understand what information may be involved when you use
            the store's features.
          </p>
        </article>

        <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5 sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF1E6] text-[#426746]">
            <PrivacyIcon type="lock" />
          </span>
          <h2 className="mt-4 font-serif text-xl text-[#244B31]">
            Account awareness
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            Learn how the current frontend handles its authentication
            token and how to protect your session.
          </p>
        </article>

        <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5 sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF1E6] text-[#426746]">
            <PrivacyIcon type="shield" />
          </span>
          <h2 className="mt-4 font-serif text-xl text-[#244B31]">
            Responsible practices
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            Privacy commitments should reflect the store's actual
            systems and verified practices.
          </p>
        </article>
      </section>

      {/* Policy content */}
      <section
        id="privacy-details"
        className="mx-auto grid max-w-7xl scroll-mt-8 gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-14 lg:px-10 lg:pb-20"
      >
        <div className="min-w-0 rounded-3xl border border-[#E4E5D9] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="border-b border-[#E5E6DB] pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718B62]">
              Privacy &amp; transparency
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#244B31]">
              Privacy policy
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#71806D]">
              The sections below describe the topics our privacy
              policy needs to address. Details that depend on
              unverified backend or business practices must be
              confirmed before this page is treated as final.
            </p>
          </div>

          <div className="divide-y divide-[#E5E6DB]">
            {privacySections.map((section) => (
              <section
                key={section.number}
                className="scroll-mt-8 py-8 first:pt-8 last:pb-2"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6EDDF] font-serif text-sm text-[#426746]">
                    {section.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-xl leading-snug text-[#244B31] sm:text-2xl">
                      {section.title}
                    </h3>

                    <div className="mt-4 space-y-3">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm leading-7 text-[#71806D]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl bg-[#244B31] p-6 text-[#FBF8F0] sm:p-7">
            <PrivacyIcon type="shield" />

            <h2 className="mt-5 font-serif text-2xl">
              Questions about privacy?
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#E0E7D9]">
              If you have a question about your account information
              or a privacy request, get in touch with our team.
            </p>

            <Link
              to="/contact"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#FBF8F0] px-5 py-3 text-sm font-semibold text-[#244B31] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Contact Us <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-3xl border border-[#E4E5D9] bg-[#F0F1E7] p-6">
            <h2 className="font-serif text-xl text-[#244B31]">
              Explore more
            </h2>

            <nav aria-label="Related pages" className="mt-4 space-y-1">
              <Link
                to="/faq"
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                Frequently asked questions <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/shipping-returns"
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                Shipping &amp; Returns <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/about"
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                About Root &amp; Leaf <span aria-hidden="true">→</span>
              </Link>
            </nav>
          </div>
        </aside>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-[#DDE4D4] bg-[#EAF0E3] px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718B62]">
            Root &amp; Leaf
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl leading-tight text-[#244B31] sm:text-4xl">
            Trust begins with transparency.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#697767]">
            Have a question about your information or how the store
            works? We're here to help.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#245333] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
