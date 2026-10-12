
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "All questions",
  "Products",
  "Orders",
  "Payments",
  "Shipping & returns",
  "Account",
];

const faqs = [
  {
    category: "Products",
    question: "How can I learn more about a product?",
    answer:
      "Visit the product details page to review the available description, ingredients, price, and other product information. If something important is missing or unclear, contact us before placing your order.",
  },
  {
    category: "Products",
    question: "Are all products certified organic?",
    answer:
      "Organic certification can vary by product. Please check the individual product information and its available certification details rather than assuming every product has the same certification.",
  },
  {
    category: "Products",
    question: "How do I choose the right product?",
    answer:
      "Start with the product description and its intended use. If you need help understanding the available options, send us a message through our Contact Us page.",
  },
  {
    category: "Orders",
    question: "How do I place an order?",
    answer:
      "Browse the shop, open a product to review its details, and add the items you want to your cart. Review your cart and follow the checkout steps to submit your order.",
  },
  {
    category: "Orders",
    question: "Where can I check my order status?",
    answer:
      "Sign in to your account and open My Orders to review the order information available to you. If you cannot find your order or need clarification, contact our team with your order reference.",
  },
  {
    category: "Orders",
    question: "Can I cancel an order?",
    answer:
      "Cancellation depends on the order's current status and the store's applicable rules. Check the order details or contact us as soon as possible if you need help with a cancellation.",
  },
  {
    category: "Orders",
    question: "What should I do if I receive the wrong or a damaged product?",
    answer:
      "Contact us with your order reference and a description of the issue. We can review the situation and explain the available next steps under the applicable store policy.",
  },
  {
    category: "Payments",
    question: "Which payment methods can I use?",
    answer:
      "The payment methods available for your purchase are the ones presented during checkout. Review those options before submitting your order.",
  },
  {
    category: "Payments",
    question: "What if my payment fails?",
    answer:
      "Check the payment status and any message shown during checkout before trying again. If money appears to have been deducted but your order is not confirmed, contact us with the relevant order or transaction reference. Never share your password, OTP, or full card details.",
  },
  {
    category: "Shipping & returns",
    question: "How long will delivery take?",
    answer:
      "Delivery estimates can depend on your location and the order. Check the information shown during checkout or in your order details for the estimate applicable to your purchase.",
  },
  {
    category: "Shipping & returns",
    question: "How can I check shipping charges?",
    answer:
      "Review the order summary during checkout before placing your order. It should show the charges applicable to your purchase.",
  },
  {
    category: "Shipping & returns",
    question: "What is your return or refund policy?",
    answer:
      "Return and refund eligibility depends on the applicable store policy and the circumstances of the order. Please contact us before assuming an item is eligible, and we will help clarify the next steps.",
  },
  {
    category: "Account",
    question: "Do I need an account to place an order?",
    answer:
      "Follow the checkout flow to see the account requirements for your purchase. Creating an account also provides access to the account features available in the store.",
  },
  {
    category: "Account",
    question: "How can I update my account information?",
    answer:
      "Sign in and visit your Profile page to review the account information and editing options currently available. If you cannot update a particular detail, contact us for assistance.",
  },
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All questions");
  const [openQuestion, setOpenQuestion] = useState(null);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All questions" ||
        faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setOpenQuestion(null);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setOpenQuestion(null);
  }

  return (
    <div className="min-h-screen bg-[#FBF8F0] text-[#263E2B]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E8E5D9] bg-[#F2F1E7]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#DDE4D3] sm:h-96 sm:w-96"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 right-20 h-64 w-64 rounded-full bg-[#E7ECDD]/70 blur-2xl"
        />

        <div className="relative mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 sm:py-20 lg:py-24">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EBDD] text-[#426746]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M9.6 9a2.5 2.5 0 1 1 4.4 1.6c-1.1 1-2 1.3-2 2.9" />
              <path d="M12 17h.01" />
            </svg>
          </span>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#718B62]">
            Root &amp; Leaf Help Center
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl">
            Good questions.
            <span className="block italic text-[#718B62]">
              Clear answers.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#697767] sm:text-base sm:leading-8">
            Looking for something specific? Find helpful information
            about products, orders, payments, and more.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <label htmlFor="faq-search" className="sr-only">
              Search frequently asked questions
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-[#DCE3D5] bg-white px-4 shadow-sm transition focus-within:border-[#527B4D] focus-within:ring-2 focus-within:ring-[#527B4D]/20 sm:px-5">
              <span className="text-[#718B62]">
                <SearchIcon />
              </span>

              <input
                id="faq-search"
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search your question..."
                className="min-h-14 w-full bg-transparent text-sm text-[#263E2B] outline-none placeholder:text-[#9AA395]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-[#527B4D] hover:bg-[#EDF1E6] focus-visible:outline-2 focus-visible:outline-[#315B3C]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-20">
        {/* Category navigation */}
        <aside>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#71806D]">
            Browse by topic
          </h2>

          <nav
            aria-label="FAQ categories"
            className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleCategoryChange(category)}
                  className={`shrink-0 rounded-xl px-4 py-3 text-left text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] ${
                    isActive
                      ? "bg-[#245333] text-white shadow-sm"
                      : "border border-[#E4E5D9] bg-white text-[#586A57] hover:border-[#C8D5BF] hover:bg-[#F2F4EC]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </nav>

          <div className="mt-7 hidden rounded-2xl border border-[#E4E5D9] bg-white p-5 lg:block">
            <span className="text-2xl text-[#527B4D]" aria-hidden="true">
              ✳
            </span>

            <h3 className="mt-3 font-serif text-xl text-[#244B31]">
              Still wondering?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#71806D]">
              Some questions need a personal answer. We're happy to
              help you find the information you need.
            </p>

            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#426746] hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>

        {/* Questions */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#E5E5D9] pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#718B62]">
                Help &amp; information
              </p>

              <h2 className="mt-2 font-serif text-2xl text-[#244B31] sm:text-3xl">
                {activeCategory === "All questions"
                  ? "Frequently asked questions"
                  : activeCategory}
              </h2>
            </div>

            <span className="rounded-full bg-[#EAF0E3] px-3 py-1.5 text-xs font-semibold text-[#426746]">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "question" : "questions"}
            </span>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="mt-4 divide-y divide-[#E8E9DE]">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openQuestion === faq.question;

                return (
                  <article
                    key={faq.question}
                    className="py-1"
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenQuestion(isOpen ? null : faq.question)
                        }
                        className="flex w-full items-center justify-between gap-5 rounded-xl py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315B3C] sm:py-6"
                      >
                        <span className="flex min-w-0 items-start gap-4">
                          <span className="mt-0.5 hidden text-xs font-semibold text-[#9BA895] sm:block">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={`text-sm font-semibold leading-6 sm:text-base ${
                              isOpen
                                ? "text-[#426746]"
                                : "text-[#263E2B]"
                            }`}
                          >
                            {faq.question}
                          </span>
                        </span>

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                            isOpen
                              ? "bg-[#245333] text-white"
                              : "bg-[#EDF1E6] text-[#426746]"
                          }`}
                        >
                          <ChevronIcon open={isOpen} />
                        </span>
                      </button>
                    </h3>

                    {isOpen && (
                      <div className="pb-6 pl-0 pr-2 sm:pl-9 sm:pr-12">
                        <p className="text-sm leading-7 text-[#71806D]">
                          {faq.answer}
                        </p>

                        <span className="mt-3 inline-flex rounded-full bg-[#F0F2E9] px-3 py-1 text-xs font-medium text-[#71806D]">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-[#DCE3D5] bg-white px-5 py-12 text-center">
              <span className="text-3xl text-[#718B62]" aria-hidden="true">
                ⌕
              </span>

              <h3 className="mt-4 font-serif text-xl text-[#244B31]">
                No matching questions
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#71806D]">
                Try a different search term or choose another topic to
                find the information you need.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All questions");
                  setOpenQuestion(null);
                }}
                className="mt-5 rounded-full bg-[#245333] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
              >
                Show all questions
              </button>
            </div>
          )}
        </div>

        {/* Mobile contact card */}
        <div className="rounded-2xl border border-[#DCE3D5] bg-white p-5 sm:p-6 lg:hidden">
          <h2 className="font-serif text-xl text-[#244B31]">
            Need a little more help?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            If you can't find your answer here, get in touch with us.
          </p>

          <Link
            to="/contact"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#245333] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            Contact Us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-14 sm:px-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#244B31] px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9D8BB]">
            We're listening
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight text-[#FBF8F0] sm:text-4xl lg:text-5xl">
            Your question matters to us.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#E0E7D9] sm:text-base">
            Can't find what you're looking for? Visit our Contact Us
            page and tell us how we can help.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FBF8F0] px-7 py-3 text-sm font-semibold text-[#244B31] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Contact Us <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
