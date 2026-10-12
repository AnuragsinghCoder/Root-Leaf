
import { Link } from "react-router-dom";

const sections = [
  {
    number: "01",
    title: "Acceptance of these terms",
    paragraphs: [
      "These Terms & Conditions describe the general rules for using the Root & Leaf website and its shopping features.",
      "Please read them before using the website or placing an order. The final published terms should identify the business operating the store and explain how customers are informed of any applicable changes.",
    ],
  },
  {
    number: "02",
    title: "Using our website",
    paragraphs: [
      "You should use the website lawfully and avoid activities that interfere with its operation, compromise security, or attempt to access accounts or information without authorization.",
      "Product availability, website features, and displayed information may change as the store is maintained. Any restrictions or commitments made by the store should be stated clearly in its final terms.",
    ],
  },
  {
    number: "03",
    title: "Customer accounts",
    paragraphs: [
      "If you create an account, provide accurate information and take reasonable steps to keep your login credentials private.",
      "The website provides account and order-management features. Account access, password recovery, account closure, and related procedures are governed by the functionality actually available in the application and the applicable policies.",
      "Contact us if you believe your account has been accessed without your permission.",
    ],
  },
  {
    number: "04",
    title: "Products and descriptions",
    paragraphs: [
      "Product pages provide information intended to help customers understand the items offered for sale. Review the available descriptions, ingredients, specifications, and other details before purchasing.",
      "Product images and descriptions should represent the items as accurately as reasonably possible. If an important detail is unclear, contact us before ordering.",
      "Organic, natural, or certification-related claims must be supported by the relevant product information. Do not assume every product has the same certification or properties.",
    ],
  },
  {
    number: "05",
    title: "Prices and availability",
    paragraphs: [
      "Review the product price and order summary before confirming a purchase. Any applicable taxes, delivery charges, or other fees should be disclosed as required.",
      "Product availability and displayed prices may change. The final terms should explain how pricing errors, unavailable products, and any affected orders are handled.",
    ],
  },
  {
    number: "06",
    title: "Orders and confirmation",
    paragraphs: [
      "When placing an order, review your selected products, quantities, delivery details, and order total carefully before submitting it.",
      "An order acknowledgement or status update should be interpreted according to the store's actual order-confirmation process. The final policy must clearly explain when an order is accepted and what happens if an order cannot be fulfilled.",
    ],
  },
  {
    number: "07",
    title: "Payments",
    paragraphs: [
      "Use the payment methods made available through the checkout process and review the final amount before completing your purchase.",
      "Payment processing, payment confirmation, failed transactions, and refunds depend on the checkout implementation and applicable payment arrangements. The final terms should describe these processes accurately.",
      "Never share your password, one-time password (OTP), or complete payment-card credentials in response to an unsolicited message.",
    ],
  },
  {
    number: "08",
    title: "Shipping, cancellations, and returns",
    paragraphs: [
      "Delivery estimates, shipping charges, order cancellations, return eligibility, and refund procedures are subject to the store's applicable policies and any rights provided by law.",
      "Review the Shipping & Returns page before placing an order. Contact us promptly if you need help with an order or believe an item has arrived damaged or incorrect.",
      "These terms should be finalized alongside the actual policies and order-status rules implemented by the store.",
    ],
  },
  {
    number: "09",
    title: "Intellectual property",
    paragraphs: [
      "Website content, including original text, branding, graphics, and design elements, may be protected by applicable intellectual property laws.",
      "Do not copy, redistribute, or use protected material in ways that violate applicable rights. Any permissions, licences, or exceptions should be assessed according to the relevant circumstances and law.",
    ],
  },
  {
    number: "10",
    title: "Website availability and security",
    paragraphs: [
      "We aim to provide a useful shopping experience, but the website may occasionally be unavailable or experience technical issues.",
      "Do not attempt to bypass access controls, interfere with website security, introduce malicious code, or misuse the website or its services.",
      "Any formal limitations of liability or warranties must be reviewed for legal validity and must not override rights that cannot lawfully be excluded.",
    ],
  },
  {
    number: "11",
    title: "Privacy and personal information",
    paragraphs: [
      "Personal information associated with accounts and orders should be handled in accordance with the store's applicable privacy practices and legal obligations.",
      "Please review our Privacy Policy to understand the information-handling practices described for Root & Leaf.",
    ],
  },
  {
    number: "12",
    title: "Changes to these terms",
    paragraphs: [
      "These terms may need to be updated when the website, its features, or its business practices change.",
      "The published version should show its effective date and explain how material changes are communicated, where required. Applicable law may impose additional requirements for certain changes.",
    ],
  },
  {
    number: "13",
    title: "Applicable law and disputes",
    paragraphs: [
      "The applicable law, dispute-resolution process, and any relevant jurisdiction should be specified after confirming the business's legal details and the laws that apply to its operations and customers.",
      "Nothing in these terms should be interpreted as removing consumer rights or other protections that cannot legally be waived.",
    ],
  },
];

function SectionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12 3 20 7v5c0 4.5-3.4 7.4-8 9-4.6-1.6-8-4.5-8-9V7l8-4Z" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function TermsPage() {
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
              <SectionIcon />
              Clear terms. Better experiences.
            </div>

            <h1 className="mt-7 font-serif text-4xl leading-tight tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl">
              A little clarity
              <span className="block italic text-[#718B62]">
                goes a long way.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#697767] sm:text-base sm:leading-8">
              These terms explain the general rules for using Root
              &amp; Leaf and shopping through our website. Please
              review them before placing an order.
            </p>

            <a
              href="#terms-details"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Read the terms
            </a>
          </div>
        </div>
      </section>

      {/* Overview cards */}
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-10 sm:grid-cols-3 sm:px-8 sm:py-14 lg:px-10">
        <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5 sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF1E6] text-[#426746]">
            <SectionIcon />
          </span>
          <h2 className="mt-4 font-serif text-xl text-[#244B31]">
            Shop with clarity
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            Review product details, prices, and your order information
            before making a purchase.
          </p>
        </article>

        <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5 sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF1E6] text-[#426746]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 7h.01" />
            </svg>
          </span>
          <h2 className="mt-4 font-serif text-xl text-[#244B31]">
            Know your options
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            Understand where to find information about orders,
            cancellations, shipping, and returns.
          </p>
        </article>

        <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5 sm:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF1E6] text-[#426746]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M4 5h16v14H4z" />
              <path d="M8 9h8M8 13h8M8 17h4" />
            </svg>
          </span>
          <h2 className="mt-4 font-serif text-xl text-[#244B31]">
            Stay informed
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            Read the related policies and contact us when you need
            clarification.
          </p>
        </article>
      </section>

      {/* Terms content */}
      <section
        id="terms-details"
        className="mx-auto grid max-w-7xl scroll-mt-8 gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-14 lg:px-10 lg:pb-20"
      >
        <div className="min-w-0 rounded-3xl border border-[#E4E5D9] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="border-b border-[#E5E6DB] pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718B62]">
              Website guidelines
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#244B31]">
              Terms &amp; Conditions
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#71806D]">
              Please read these sections carefully. The wording is a
              starting draft and must be checked against the actual
              store policies before publication.
            </p>
          </div>

          <div className="divide-y divide-[#E5E6DB]">
            {sections.map((section) => (
              <section
                key={section.number}
                className="py-8 first:pt-8 last:pb-2"
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

        {/* Related links */}
        <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl bg-[#244B31] p-6 text-[#FBF8F0] sm:p-7">
            <SectionIcon />

            <h2 className="mt-5 font-serif text-2xl">
              Need some help?
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#E0E7D9]">
              If you have a question about an order or one of our
              policies, get in touch with our team.
            </p>

            <Link
              to="/contact"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FBF8F0] px-5 py-3 text-sm font-semibold text-[#244B31] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Contact Us <ArrowIcon />
            </Link>
          </div>

          <div className="rounded-3xl border border-[#E4E5D9] bg-[#F0F1E7] p-6">
            <h2 className="font-serif text-xl text-[#244B31]">
              Related policies
            </h2>

            <nav aria-label="Related policy links" className="mt-4 space-y-1">
              <Link
                to="/privacy-policy"
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                Privacy Policy <ArrowIcon />
              </Link>

              <Link
                to="/shipping-returns"
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                Shipping &amp; Returns <ArrowIcon />
              </Link>

              <Link
                to="/faq"
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                FAQs <ArrowIcon />
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
            Good experiences start with clear expectations.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#697767]">
            Explore our store or reach out if you need help
            understanding a policy.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Explore products
            </Link>

            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C8D5BF] bg-white px-6 py-3 text-sm font-semibold text-[#315B3C] transition hover:bg-[#F8FAF5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
