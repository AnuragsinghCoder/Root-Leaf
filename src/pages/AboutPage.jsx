
import { Link } from "react-router-dom";

const values = [
  {
    number: "01",
    title: "Thoughtful choices",
    description:
      "We believe everyday products deserve a little more thought, from what goes into them to how they fit into your routine.",
    icon: "✳",
  },
  {
    number: "02",
    title: "Inspired by nature",
    description:
      "Nature inspires our approach to mindful living, simple rituals, and products that feel at home in everyday life.",
    icon: "❋",
  },
  {
    number: "03",
    title: "Honest by design",
    description:
      "We believe customers deserve clear product information and the confidence to make choices that suit their needs.",
    icon: "◇",
  },
];

function LeafMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <path
        d="M24 40V19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24 29C11 29 8 19 10 10C21 10 27 18 24 29Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M24 22C24 11 31 5 40 7C40 17 34 24 24 22Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="overflow-hidden bg-[#FBF8F0] text-[#263E2B]">
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#668064]">
            A little about us
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-[1.12] tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl">
            Rooted in nature.
            <span className="mt-2 block italic text-[#718B62]">
              Made for mindful living.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#697767] sm:text-lg">
            We believe the little things we choose every day can make
            life feel more thoughtful. Root & Leaf is a space inspired
            by nature, intentional choices, and a simpler approach to
            everyday living.
          </p>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#697767]">
            Our journey is about discovering products worth knowing,
            sharing what matters, and making room for more mindful
            everyday rituals.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#245333] px-7 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Let's talk
              <span aria-hidden="true">↗</span>
            </Link>

            <a
              href="#our-values"
              className="inline-flex min-h-12 items-center rounded-full px-4 py-3 text-sm font-semibold text-[#315B3C] transition hover:bg-[#EEF1E7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Discover our values
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-[#E5E5D9] pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF0E3] text-[#315B3C]">
              <LeafMark />
            </span>

            <div>
              <p className="font-serif text-base font-semibold text-[#244B31]">
                Root &amp; Leaf
              </p>
              <p className="mt-1 text-xs tracking-wide text-[#788172]">
                Naturally, every day.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-[#E8ECDD] sm:-right-6 sm:-top-6 sm:h-44 sm:w-44" />

          <div className="relative overflow-hidden rounded-t-[48%] rounded-b-3xl border border-[#E5E5D9] bg-[#E9EBDD] p-2 sm:rounded-t-[48%] sm:rounded-b-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85"
              alt="Sunlight filtering through a lush green forest"
              className="aspect-[4/5] w-full rounded-t-[48%] rounded-b-2xl object-cover sm:rounded-b-[1.5rem]"
              fetchPriority="high"
            />
          </div>

          <div className="absolute -bottom-5 left-2 max-w-[230px] rounded-2xl border border-[#E5E5D9] bg-[#FBF8F0] p-4 shadow-lg shadow-[#263E2B]/5 sm:-left-6 sm:max-w-[260px] sm:p-5">
            <LeafMark />
            <p className="mt-2 font-serif text-lg leading-snug text-[#244B31] sm:text-xl">
              A more thoughtful way to live.
            </p>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="border-y border-[#E5E5D9] bg-[#F2F1E7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#718B62]">
              The thinking behind the brand
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#244B31] sm:text-4xl lg:text-5xl">
              It starts with the little things.
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-8 text-[#697767] sm:text-base">
            <p>
              A daily ritual. An ingredient you understand. A product
              chosen with care. Sometimes, a more mindful lifestyle
              begins with small decisions rather than big changes.
            </p>

            <p>
              That is the spirit behind Root &amp; Leaf. We want to
              create a welcoming place where discovering products feels
              simple, information feels approachable, and nature
              remains an inspiration for everyday choices.
            </p>

            <p>
              We're building this brand around curiosity, thoughtful
              selection, and a belief that shopping should feel as
              considered as the products we bring into our lives.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        id="our-values"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#718B62]">
            What guides us
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#244B31] sm:text-4xl lg:text-5xl">
            Our values, naturally.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#697767] sm:text-base">
            The principles we want every Root &amp; Leaf experience to
            reflect.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {values.map((value) => (
            <article
              key={value.number}
              className="group rounded-2xl border border-[#E4E5D9] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#C8D5BF] hover:shadow-lg hover:shadow-[#263E2B]/5 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF1E6] font-serif text-2xl text-[#426746] transition group-hover:bg-[#245333] group-hover:text-white">
                  {value.icon}
                </span>

                <span className="font-serif text-sm text-[#9BA895]">
                  {value.number}
                </span>
              </div>

              <h3 className="mt-7 font-serif text-2xl text-[#244B31]">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#71806D]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Closing section */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#244B31] px-6 py-12 text-center sm:px-12 sm:py-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10 sm:h-80 sm:w-80"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full border border-white/10 sm:h-80 sm:w-80"
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-[#E4EBD9]">
              <LeafMark />
            </span>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#C9D8BB]">
              We'd love to hear from you
            </p>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#FBF8F0] sm:text-4xl lg:text-5xl">
              Every good conversation starts somewhere.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#E0E7D9] sm:text-base">
              Have a question, an idea, or simply want to know more
              about Root &amp; Leaf? Get in touch. We'd be happy to
              hear from you.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#FBF8F0] px-7 py-3 text-sm font-semibold text-[#244B31] transition duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Contact Us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
