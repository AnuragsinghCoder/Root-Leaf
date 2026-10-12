
import { Link } from "react-router-dom";

const policySections = [
  {
    number: "01",
    title: "Shipping & delivery",
    intro: "What to know before your order arrives.",
    items: [
      {
        title: "Delivery estimates",
        text: "Your estimated delivery timeline should be reviewed during checkout or in your order details. Actual delivery may vary depending on your location and the delivery service.",
      },
      {
        title: "Shipping charges",
        text: "Please review the order summary before placing your order. Any applicable shipping charges should be displayed during checkout.",
      },
      {
        title: "Delivery address",
        text: "Double-check your name, address, postal code, and contact details before confirming your order. If you notice an error after ordering, contact us as soon as possible.",
      },
    ],
  },
  {
    number: "02",
    title: "Order tracking",
    intro: "Stay informed about your purchase.",
    items: [
      {
        title: "Where can I find my order?",
        text: "Sign in to your account and visit My Orders to review the order information and status currently available.",
      },
      {
        title: "My order hasn't arrived",
        text: "First, review the latest status and any delivery estimate shown for your order. If the order appears delayed, contact us with your order reference so the situation can be reviewed.",
      },
    ],
  },
  {
    number: "03",
    title: "Cancellations",
    intro: "Need to make a change?",
    items: [
      {
        title: "Can I cancel my order?",
        text: "Cancellation depends on the order's current status and the applicable store policy. Contact us as soon as possible if you need to request a cancellation. A request is not confirmed until its status is communicated to you.",
      },
      {
        title: "Can I change my delivery address?",
        text: "Address changes may not be possible once an order has progressed through fulfilment. Contact us promptly with your order reference and the correction you need.",
      },
    ],
  },
  {
    number: "04",
    title: "Returns & refunds",
    intro: "Help when something isn't right.",
    items: [
      {
        title: "Can I return a product?",
        text: "Return eligibility, conditions, and time limits must follow the store's confirmed return policy. Please contact us before sending an item back so we can explain the applicable process.",
      },
      {
        title: "I received a damaged or incorrect item",
        text: "Contact us with your order reference and a clear description of the issue. Include relevant photos if requested. We'll review the information and explain the available next steps.",
      },
      {
        title: "When will I receive a refund?",
        text: "Refund eligibility and processing timelines depend on the circumstances and the applicable policy. Any confirmed refund details should be communicated to you directly.",
      },
    ],
  },
];

function LeafMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        d="M39 8C23 8 11 13 11 27c0 7 5 11 11 10C36 35 39 20 39 8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M8 40c7-12 14-18 24-25M18 28l-1-8M25 21l8 1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
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
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PolicySection({ section }) {
  return (
    <section
      id={`policy-${section.number}`}
      className="scroll-mt-8 border-b border-[#E5E6DB] py-9 first:pt-0 last:border-b-0 sm:py-11"
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6EDDF] font-serif text-sm text-[#426746]">
          {section.number}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-2xl leading-tight text-[#244B31] sm:text-3xl">
            {section.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            {section.intro}
          </p>

          <div className="mt-6 space-y-6">
            {section.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-semibold text-[#344B36] sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#71806D]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ShippingReturnsPage() {
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
          className="pointer-events-none absolute -bottom-24 left-[12%] h-56 w-56 rounded-full bg-[#E3EAD9]/70 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D6DFCE] bg-[#FBF8F0]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#527B4D]">
              <LeafMark />
              A little clarity goes a long way
            </div>

            <h1 className="mt-7 font-serif text-4xl leading-tight tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl">
              From our store
              <span className="block italic text-[#718B62]">
                to your doorstep.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#697767] sm:text-base sm:leading-8">
              Everything you need to know about shipping, delivery,
              order changes, returns, and refunds — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shipping"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
              >
                Shipping information
              </a>

              <a
                href="#policy-04"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CCD8C5] bg-white/70 px-6 py-3 text-sm font-semibold text-[#315B3C] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
              >
                Returns &amp; refunds
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick guide */}
      <section
        id="shipping"
        className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-[#E4E5D9] bg-white p-5 sm:p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF1E6] text-[#426746]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M3 7h11v11H3zM14 11h4l3 3v4h-7z" />
                <circle cx="7.5" cy="18" r="1.8" />
                <circle cx="17.5" cy="18" r="1.8" />
              </svg>
            </span>

            <h2 className="mt-4 font-serif text-xl text-[#244B31]">
              Delivery details
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#71806D]">
              Check the delivery estimate and applicable charges at
              checkout before placing your order.
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
                className="h-5 w-5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>

            <h2 className="mt-4 font-serif text-xl text-[#244B31]">
              Order updates
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#71806D]">
              Sign in to your account to review the order status
              information available for your purchase.
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
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
                <path d="M3 3v5h5M12 7v5l3 2" />
              </svg>
            </span>

            <h2 className="mt-4 font-serif text-xl text-[#244B31]">
              Need a return?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#71806D]">
              Contact us before sending anything back so we can
              explain the applicable return process.
            </p>
          </article>
        </div>
      </section>

      {/* Policy details */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:px-10 lg:pb-20">
        <div className="min-w-0 rounded-3xl border border-[#E4E5D9] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="mb-8 border-b border-[#E5E6DB] pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718B62]">
              The details
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#244B31]">
              Shipping &amp; returns guide
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#71806D]">
              Review the guidance below before placing an order or
              requesting a change.
            </p>
          </div>

          {policySections.map((section) => (
            <PolicySection key={section.number} section={section} />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl bg-[#244B31] p-6 text-[#FBF8F0] sm:p-7">
            <span className="text-[#D4E0C8]">
              <LeafMark />
            </span>

            <h2 className="mt-5 font-serif text-2xl leading-snug">
              We're here to help.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#E0E7D9]">
              Have a question about an order, delivery, or return?
              Reach out and tell us what you need help with.
            </p>

            <Link
              to="/contact"
              className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FBF8F0] px-5 py-3 text-sm font-semibold text-[#244B31] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Contact Us <ArrowIcon />
            </Link>
          </div>

          <div className="rounded-3xl border border-[#E4E5D9] bg-[#F0F1E7] p-6">
            <h2 className="font-serif text-xl text-[#244B31]">
              Quick links
            </h2>

            <nav aria-label="Shipping help links" className="mt-4 space-y-1">
              <Link
                to="/faq"
                className="group flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                Frequently asked questions
                <ArrowIcon />
              </Link>

              <Link
                to="/products"
                className="group flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                Continue shopping
                <ArrowIcon />
              </Link>

              <Link
                to="/orders"
                className="group flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-[#586A57] transition hover:bg-white/70 hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
              >
                My Orders
                <ArrowIcon />
              </Link>
            </nav>
          </div>

          <p className="px-2 text-xs leading-6 text-[#818A7C]">
            Please refer to the store's confirmed policies and the
            information provided for your specific order. This page
            contains general guidance, not a guarantee of eligibility
            or delivery timing.
          </p>
        </aside>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-[#DDE4D4] bg-[#EAF0E3] px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718B62]">
            Root &amp; Leaf
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl leading-tight text-[#244B31] sm:text-4xl">
            A little help makes every step easier.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#697767]">
            We're here to help you navigate your shopping experience
            with confidence.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#245333] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            Get in touch <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
