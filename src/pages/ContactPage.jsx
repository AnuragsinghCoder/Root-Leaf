
import { useState } from "react";
import { Link } from "react-router-dom";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#DCE3D5] bg-[#FFFEFA] px-4 py-3 text-sm text-[#263E2B] outline-none transition placeholder:text-[#9AA395] focus:border-[#527B4D] focus:ring-2 focus:ring-[#527B4D]/20";

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Intentionally no fake success message.
    // Connect a real backend submission service before enabling this form.
  }

  return (
    <div className="bg-[#FBF8F0] text-[#263E2B]">
      <section className="relative overflow-hidden border-b border-[#E8E5D9] bg-[#F2F1E7]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#718B62]">
              We're here to help
            </p>

            <h1 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl">
              Let's start a
              <span className="block italic text-[#718B62]">
                conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#697767] sm:text-base sm:leading-8">
              Have a question about a product, an order, or Root &amp;
              Leaf? We'd love to hear from you. Share what's on your
              mind, and we'll help you find the right next step.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#D5DDCF] px-5 py-3 text-sm font-semibold text-[#315B3C] transition hover:bg-[#E7ECDF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Explore our products <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#E1E8D8] sm:-right-5 sm:-top-5 sm:h-32 sm:w-32" />

            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=85"
              alt="Sunlight falling through a peaceful green woodland"
              className="relative aspect-[5/4] w-full rounded-[2rem] object-cover shadow-xl shadow-[#263E2B]/10"
            />

            <div className="absolute -bottom-4 left-4 rounded-xl border border-[#E5E5D9] bg-[#FBF8F0] px-5 py-4 shadow-lg sm:left-8">
              <p className="font-serif text-lg text-[#244B31]">
                Root &amp; Leaf
              </p>
              <p className="mt-1 text-xs text-[#788172]">
                Naturally, every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#718B62]">
            Get in touch
          </p>

          <h2 className="mt-3 font-serif text-3xl text-[#244B31] sm:text-4xl">
            How can we help?
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#697767]">
            Choose a topic and tell us a little about what you need.
            We're building this space to make getting help simple and
            straightforward.
          </p>

          <div className="mt-8 rounded-2xl border border-[#E4E5D9] bg-white p-5 sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF1E6] text-xl text-[#426746]">
              ✉
            </div>

            <h3 className="mt-4 font-semibold text-[#244B31]">
              Have a question?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#71806D]">
              Use the form to prepare your message. Online delivery
              will be enabled once a real submission endpoint is
              connected.
            </p>
          </div>

          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#426746] hover:text-[#244B31] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            Learn more about us <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-[#E4E5D9] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <h2 className="font-serif text-2xl text-[#244B31] sm:text-3xl">
            Send us a message
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#71806D]">
            Fields marked with * are required.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-sm font-semibold text-[#36553B]"
                >
                  Your name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter your name"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-sm font-semibold text-[#36553B]"
                >
                  Email address *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="text-sm font-semibold text-[#36553B]"
              >
                What is this about? *
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Choose a topic</option>
                <option value="Product enquiry">Product enquiry</option>
                <option value="Order and delivery">Order and delivery</option>
                <option value="Payment">Payment</option>
                <option value="Returns and cancellations">
                  Returns and cancellations
                </option>
                <option value="Other">Something else</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="text-sm font-semibold text-[#36553B]"
              >
                Your message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} min-h-36 resize-y`}
                placeholder="Tell us how we can help..."
                required
                minLength={10}
                maxLength={3000}
              />
              <p className="mt-2 text-right text-xs text-[#899286]">
                {form.message.length}/3000 characters
              </p>
            </div>

            <button
              type="submit"
              disabled
              className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white opacity-60 sm:w-auto"
            >
              Submission setup required
            </button>

            <p className="text-xs leading-5 text-[#899286]">
              This form is a visual preview only. It will not send or
              store your message until a real submission service is
              connected.
            </p>
          </form>
        </div>
      </section>

      <section className="border-t border-[#E5E5D9] bg-[#F2F1E7] px-5 py-10 text-center sm:px-8 sm:py-14">
        <p className="font-serif text-2xl text-[#244B31] sm:text-3xl">
          Thoughtfully chosen. Naturally inspired.
        </p>
        <p className="mt-3 text-sm text-[#71806D]">
          Thank you for being part of the Root &amp; Leaf journey.
        </p>
      </section>
    </div>
  );
}
