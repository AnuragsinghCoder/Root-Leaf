
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/product/ProductCard";
import productApi from "../services/productApi";

import categoryApi from "../services/categoryApi";
import { getList } from "../utils/adminResponse";


function CategoryImage({ category }) {
  const imageUrl = Array.isArray(category.images)
    ? category.images.find(
        (image) => typeof image === "string" && image.trim()
      )
    : typeof category.images === "string"
      ? category.images.trim()
      : "";

  const [imageFailed, setImageFailed] = useState(false);

  if (!imageUrl || imageFailed) {
    return (
      <div
        className="flex aspect-[4/3] w-full items-center justify-center bg-[#E8EDDF] px-4 text-center sm:aspect-[4/5]"
        role="img"
        aria-label={`${category.name}, category image unavailable`}
      >
        <span className="max-w-full break-words font-serif text-xl font-medium text-[#31583B] sm:text-2xl">
          {category.name}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={category.name}
      loading="lazy"
      onError={() => setImageFailed(true)}
      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-[4/5]"
    />
  );
}

const benefits = [
  {
    number: "01",
    title: "Inspired by Nature",
    description:
      "Explore products that bring a little more nature into your everyday routine.",
  },
  {
    number: "02",
    title: "Thoughtful Choices",
    description:
      "Discover everyday essentials and find what works for your lifestyle.",
  },
  {
    number: "03",
    title: "Easy Shopping",
    description:
      "Browse our collection and order your favourites in just a few steps.",
  },
];


const testimonials = [
  {
    id: 1,
    quote:
      "I found it easy to explore the collection and discover products for my everyday routine.",
    name: "Demo customer",
    label: "Sample review",
  },
  {
    id: 2,
    quote:
      "The clean layout makes browsing different product categories feel simple and enjoyable.",
    name: "Demo customer",
    label: "Sample review",
  },
  {
    id: 3,
    quote:
      "I appreciate having product details and shopping options presented in one clear place.",
    name: "Demo customer",
    label: "Sample review",
  },
];


function extractProducts(response) {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.products)) {
    return response.data.products;
  }

  if (Array.isArray(response?.products)) {
    return response.products;
  }

  return [];
}



function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const loadLatestProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await productApi.getProducts({
        sort: "-createdAt",
        page: 1,
        limit: 4,
      });

      setProducts(extractProducts(response));
    } catch (err) {
      setProducts([]);
      setError(
        err?.message || "We couldn't load our products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

const loadCategories = useCallback(async () => {
  setCategoriesLoading(true);

  try {
    const response = await categoryApi.getCategories();
    setCategories(getList(response, "categories"));
  } catch (err) {
    console.error("Could not load categories:", err);
    setCategories([]);
  } finally {
    setCategoriesLoading(false);
  }
}, []);

  useEffect(() => {
    loadLatestProducts();
    loadCategories();
  }, [loadLatestProducts, loadCategories]);

  return (
    <div className="overflow-hidden bg-[#FBF8F0] text-[#243D2D]">
      {/* Announcement bar */}
      <div className="bg-[#245333] px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        A little more nature in your everyday life.
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-9 px-5 py-10 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div className="order-2 lg:order-1">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#52815C] sm:text-sm">
            Rooted in nature. Made for everyday living.
          </p>

          <h1 className="max-w-xl font-serif text-4xl font-medium leading-[1.12] tracking-tight text-[#244B31] sm:text-5xl lg:text-6xl xl:text-7xl">
            Bring home a little more{" "}
            <span className="italic text-[#39804B]">green.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#687568] sm:text-lg sm:leading-8">
            Discover everyday essentials, wholesome ingredients, and
            nature-inspired finds for a more thoughtful daily routine.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C8D6C6] px-7 py-3 text-sm font-semibold text-[#315B3C] transition-colors hover:bg-[#EAF0E3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Shop all products
              <span aria-hidden="true" className="ml-2 text-lg">
                →
              </span>
            </Link>

            <a
              href="#shop-by-category"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C8D6C6] px-6 py-3 text-sm font-semibold text-[#315B3C] transition-colors hover:bg-[#EDF2E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Explore categories
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-[#637466] sm:text-sm">
            <span>
              <span className="mr-2 text-[#39804B]" aria-hidden="true">
                ✓
              </span>
              Thoughtful selections
            </span>

            <span>
              <span className="mr-2 text-[#39804B]" aria-hidden="true">
                ✓
              </span>
              Everyday essentials
            </span>
          </div>
        </div>

        <div className="relative order-1 min-w-0 lg:order-2">
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-[2rem] bg-[#E8EEDC] sm:-inset-4"
          />

          <img
            src="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1200&q=85"
            alt="A warm cup of tea in a natural, calming setting"
            fetchPriority="high"
            className="relative h-[280px] w-full rounded-[1.5rem] object-cover shadow-sm sm:h-[400px] lg:h-[480px]"
          />

          <div className="absolute bottom-4 left-4 max-w-[230px] rounded-2xl border border-white/70 bg-[#FBF8F0]/95 p-4 shadow-md backdrop-blur-sm sm:bottom-7 sm:left-7 sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#52815C] sm:text-xs">
              Make space for yourself
            </p>

            <p className="mt-2 font-serif text-xl text-[#244B31] sm:text-2xl">
              Slow down. Feel good.
            </p>
          </div>
        </div>
      </section>

      {/* Brand message strip */}
      <section className="border-y border-[#E1E5D8] bg-[#F0F1E5] px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-xs font-medium text-[#45694A] sm:justify-between sm:text-sm">
          <span>Inspired by nature</span>
          <span aria-hidden="true" className="hidden text-[#91A58A] sm:inline">
            •
          </span>
          <span>Made for everyday rituals</span>
          <span aria-hidden="true" className="hidden text-[#91A58A] sm:inline">
            •
          </span>
          <span>Thoughtful everyday choices</span>
        </div>
      </section>

      {/* Dynamic categories from the product API */}
      <section
        id="shop-by-category"
        className="mx-auto max-w-7xl scroll-mt-28 px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52815C]">
              Find your favourites
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium text-[#244B31] sm:text-4xl">
              A little something for every day.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#748073] sm:text-base">
              Explore collections inspired by natural ingredients,
              everyday rituals, and simpler living.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 py-2 text-sm font-semibold text-[#315B3C] hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
          >
            View all products <span aria-hidden="true">→</span>
          </Link>
        </div>

        {categoriesLoading ? (
          <div
            className="mt-8 grid grid-cols-2 gap-3 sm:mt-11 sm:gap-5 lg:grid-cols-4"
            aria-label="Loading categories"
            aria-busy="true"
          >
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-[#E9E5D9] bg-white p-3 sm:p-5"
              >
                <div className="aspect-[4/3] rounded-xl bg-[#E9E9DF] sm:aspect-[4/5]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-[#E9E9DF]" />
                <div className="mt-3 h-3 w-1/2 rounded bg-[#E9E9DF]" />
              </div>
            ))}
          </div>

            ) : categories.length > 0 ? (
              <>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-11 sm:gap-5 lg:grid-cols-4">
                  {categories.slice(0, 8).map((category, index) => (
                    <Link
                      key={category._id}
                      to={`/products?category=${encodeURIComponent(category._id)}`}
                      className={`group min-w-0 overflow-hidden rounded-2xl border border-[#E9E5D9] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C] ${
                        index >= 4 ? "hidden lg:block" : ""
                      }`}
                    >
                      <div className="overflow-hidden bg-[#E8EDDF]">
                        <CategoryImage category={category} />
                      </div>

                      <div className="p-3 sm:p-5">
                        <h3 className="break-words font-semibold leading-snug text-[#2E5037] sm:text-lg">
                          {category.name}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[#7A8376] sm:text-sm">
                          Explore our {category.name.toLowerCase()} collection.
                        </p>

                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#27804B] sm:text-sm">
                          Explore collection
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {categories.length > 4 && (
                  <div className="mt-8 text-center">
                    <Link
                      to="/categories"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#245333] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
                    >
                      View all categories
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </>
            ) : (

          <div className="mt-8 rounded-2xl border border-dashed border-[#D5DDCF] bg-white/70 px-5 py-10 text-center sm:mt-11">
            <h3 className="font-semibold text-[#244B31]">
              Categories are coming soon
            </h3>

            <p className="mt-2 text-sm text-[#748073]">
              Browse our collection to see the products currently available.
            </p>

            <Link
              to="/products"
              className="mt-5 inline-flex rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27]"
            >
              Browse products
            </Link>
          </div>
        )}
      </section>

      {/* Latest arrivals from the existing API */}
      <section
        aria-labelledby="latest-products-heading"
        className="border-y border-[#E6E5D9] bg-[#F6F4EB] px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52815C]">
                Just arrived
              </p>

              <h2
                id="latest-products-heading"
                className="mt-3 font-serif text-3xl font-medium text-[#244B31] sm:text-4xl"
              >
                Latest arrivals
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#748073] sm:text-base">
                Take a look at the latest products in our collection.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex w-fit items-center gap-2 py-2 text-sm font-semibold text-[#315B3C] hover:text-[#176B43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
            >
              Shop the collection <span aria-hidden="true">→</span>
            </Link>
          </div>

          {loading ? (
            <div
              className="mt-9 grid grid-cols-2 gap-3 sm:mt-11 sm:gap-5 lg:grid-cols-4"
              aria-label="Loading latest products"
              aria-busy="true"
            >
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-2xl border border-[#E6E5D9] bg-white p-3 sm:p-4"
                >
                  <div className="aspect-[4/3] rounded-xl bg-[#E9E9DF]" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-[#E9E9DF]" />
                  <div className="mt-3 h-4 w-1/3 rounded bg-[#E9E9DF]" />
                  <div className="mt-5 h-10 rounded-lg bg-[#E9E9DF]" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div
              role="alert"
              className="mt-9 rounded-2xl border border-red-200 bg-white px-5 py-10 text-center sm:mt-11"
            >
              <h3 className="font-semibold text-[#244B31]">
                We couldn't load the products
              </h3>

              <p className="mt-2 text-sm text-[#748073]">{error}</p>

              <button
                type="button"
                onClick={loadLatestProducts}
                className="mt-5 rounded-full bg-[#245333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
              >
                Try again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="mt-9 rounded-2xl border border-dashed border-[#D5DDCF] bg-white/70 px-5 py-12 text-center sm:mt-11">
              <h3 className="font-semibold text-[#244B31]">
                Your collection is growing
              </h3>

              <p className="mt-2 text-sm text-[#748073]">
                There are no products to show right now. Please check back soon.
              </p>

              <Link
                to="/products"
                className="mt-5 inline-flex rounded-full border border-[#C8D6C6] px-5 py-2.5 text-sm font-semibold text-[#315B3C] transition hover:bg-[#EDF2E8]"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-11 sm:gap-5 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                to="/products"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#C8D6C6] px-7 py-3 text-sm font-semibold text-[#315B3C] transition-colors hover:bg-[#EAF0E3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
              >
                Discover all products
              </Link>
            </div>
          )}
        </div>
      </section>
      {/* Organic essentials promotional banner */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="relative mx-auto min-h-[380px] max-w-7xl overflow-hidden rounded-[1.75rem] bg-[#244B31] sm:min-h-[440px] lg:min-h-[480px]">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2000&q=85"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark overlay improves text readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#142D1D]/90 via-[#142D1D]/65 to-[#142D1D]/15"
          />

          {/* Banner content */}
          <div className="relative z-10 flex min-h-[380px] items-center px-6 py-12 sm:min-h-[440px] sm:px-12 sm:py-16 lg:min-h-[480px] lg:px-16">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D7E5C6] sm:text-sm">
                Everyday living, naturally
              </p>

              <h2 className="mt-4 max-w-lg font-serif text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
                Make room for the little things that feel good.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                Explore thoughtful everyday essentials and discover simple
                ways to bring a little more nature into your routine.
              </p>

              <Link
                to="/products"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#F6F4EB] px-7 py-3 text-sm font-semibold text-[#244B31] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore the collection
                <span aria-hidden="true" className="ml-2 text-lg">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Brand benefits */}
      <section className="bg-[#EAF0E3] px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52815C]">
              A simpler kind of shopping
            </p>

            <h2 className="mt-3 font-serif text-3xl font-medium text-[#244B31] sm:text-4xl">
              Good things, naturally.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-[#DCE5D5] bg-white/80 p-6 sm:p-8"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF0E3] text-xs font-semibold tracking-wider text-[#315B3C]">
                  {benefit.number}
                </span>

                <h3 className="mt-5 font-semibold text-[#31563A]">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#748073]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      
      {/* Customer testimonials */}
      <section
        aria-labelledby="testimonials-heading"
        className="border-y border-[#E1E5D8] bg-[#F6F4EB] px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52815C]">
              The Root & Leaf experience
            </p>

            <h2
              id="testimonials-heading"
              className="mt-3 font-serif text-3xl font-medium text-[#244B31] sm:text-4xl"
            >
              A little love for simpler living.
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#748073] sm:text-base">
              We're building a community around thoughtful everyday choices.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="flex h-full flex-col rounded-2xl border border-[#E6E5D9] bg-white p-6 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-4xl leading-none text-[#72916D]"
                >
                  “
                </span>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#566556] sm:text-base">
                  {testimonial.quote}
                </p>

                <div className="mt-6 border-t border-[#E9E9DF] pt-4">
                  <p className="font-semibold text-[#31563A]">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs text-[#748073]">
                    {testimonial.label} — replace before launch
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* Closing call to action */}
      <section className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#52815C]">
          Rooted in nature
        </p>

        <h2 className="mt-3 font-serif text-3xl font-medium text-[#244B31] sm:text-4xl">
          Your next favourite starts here.
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#748073] sm:text-base">
          Explore our collection and find something lovely for your everyday
          routine.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#245333] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#183E27] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315B3C]"
        >
          Browse the collection
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
