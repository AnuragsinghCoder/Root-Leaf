import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import productApi from "../services/productApi";
import AddToCartButton from "../components/cart/AddToCartButton";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const response = await productApi.getProductById(id);

        if (!isMounted) return;

        const data = response?.data ?? response;
        const receivedProduct = data?.product ?? data;

        setProduct(receivedProduct);
      } catch (error) {
        if (!isMounted) return;

        setProduct(null);
        setError(error.message || "Unable to load product.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price / 100);

  if (loading) {
    return (
      <section className="flex min-h-[65vh] items-center justify-center bg-[#faf8f1] px-4 py-16">
        <div className="w-full max-w-sm text-center">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dce5d5] border-t-[#315c3b]"
            role="status"
            aria-label="Loading product"
          />
          <p className="mt-5 text-lg font-semibold text-[#243b2a]">
            Gathering the details
          </p>
          <p className="mt-2 text-sm text-[#777c6d]">
            Please wait while we load this product.
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#faf8f1] px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
            Something went wrong
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#243b2a]">
            Unable to load this product
          </h1>
          <p className="mt-3 break-words text-sm leading-6 text-[#777c6d]">
            {error}
          </p>
          <Link
            to="/products"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#315c3b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24482e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b]"
          >
            Explore all products
          </Link>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#faf8f1] px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-[#e7e4d9] bg-white p-8 text-center sm:p-12">
          <span
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf2e7] text-2xl text-[#315c3b]"
            aria-hidden="true"
          >
            ✳
          </span>
          <h1 className="mt-5 text-2xl font-semibold text-[#243b2a]">
            Product not found
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#777c6d]">
            This product may no longer be available. Explore our collection to
            find something you love.
          </p>
          <Link
            to="/products"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#315c3b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24482e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b]"
          >
            Browse products
          </Link>
        </div>
      </section>
    );
  }

  const hasStock = product.stock > 0;
  const image = product.images?.[0];
  const category =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  return (
    <main className="min-h-screen bg-[#faf8f1] text-[#243b2a]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-[#777c6d]">
            <li>
              <Link
                to="/"
                className="transition hover:text-[#315c3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c3b]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to="/products"
                className="transition hover:text-[#315c3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c3b]"
              >
                Shop
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li className="max-w-40 truncate text-[#315c3b]">
                  {category}
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="mt-7 grid items-start gap-8 md:mt-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Product image */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[#e9e5d8] bg-[#f0eee3]">
              {image ? (
                <img
                  src={image}
                  alt={product.name || "Product"}
                  className="aspect-square w-full object-cover"
                  fetchPriority="high"
                />
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center gap-3 px-6 text-center">
                  <span className="text-5xl text-[#7d9272]" aria-hidden="true">
                    ✳
                  </span>
                  <p className="text-sm text-[#777c6d]">
                    Product image coming soon
                  </p>
                </div>
              )}

              <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-[#faf8f1]/95 px-4 py-2 text-xs font-semibold tracking-wide text-[#315c3b] shadow-sm sm:left-5 sm:top-5">
                Thoughtfully selected
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#e9e5d8] bg-white/70 p-4 sm:p-5">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf2e7] text-lg text-[#315c3b]"
                aria-hidden="true"
              >
                ♧
              </span>
              <div>
                <p className="text-sm font-semibold text-[#315c3b]">
                  A more mindful everyday choice
                </p>
                <p className="mt-1 text-sm leading-6 text-[#777c6d]">
                  Explore the product details and choose what works for your
                  everyday routine.
                </p>
              </div>
            </div>
          </div>

          {/* Product information */}
          <div className="pt-1 sm:pt-3 lg:pt-5">
            {category && (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6c815e]">
                {category}
              </p>
            )}

            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#243b2a] sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-[#315c3b] sm:text-4xl">
              {formatPrice(product.price)}
            </p>

            <p className="mt-2 text-sm text-[#777c6d]">
              Inclusive of applicable taxes, where applicable.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium ${
                  hasStock
                    ? "bg-[#e8f0e2] text-[#315c3b]"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    hasStock ? "bg-[#4f7c45]" : "bg-red-500"
                  }`}
                  aria-hidden="true"
                />
                {hasStock ? `${product.stock} available` : "Out of stock"}
              </span>

              {hasStock && (
                <span className="text-sm text-[#777c6d]">
                  Ready to add to your cart
                </span>
              )}
            </div>

            <div className="mt-7 rounded-2xl border border-[#e5e3d7] bg-white p-4 sm:p-5">
              <AddToCartButton
                product={product}
                className="[&_button]:min-h-13 [&_button]:rounded-full [&_button]:bg-[#315c3b] [&_button]:px-6 [&_button]:py-4 [&_button]:font-semibold [&_button]:text-white [&_button]:transition [&_button]:hover:bg-[#24482e] [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-4 [&_button]:focus-visible:outline-[#315c3b] [&_button]:disabled:cursor-not-allowed [&_button]:disabled:opacity-50"
              />

              <p className="mt-3 text-center text-xs leading-5 text-[#777c6d]">
                Questions about this product? Review its details below before
                purchasing.
              </p>
            </div>

            <div className="mt-8 border-t border-[#e5e3d7] pt-7 sm:mt-10 sm:pt-8">
              <h2 className="text-xl font-semibold text-[#243b2a]">
                About this product
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#626b5b] sm:text-base sm:leading-8">
                {product.description || "No description available for this product yet."}
              </p>
            </div>

            <div className="mt-7 grid gap-3 border-t border-[#e5e3d7] pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <span
                  className="text-xl text-[#6c815e]"
                  aria-hidden="true"
                >
                  ♧
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#315c3b]">
                    Carefully chosen
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#777c6d]">
                    Discover products for a more mindful routine.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="text-xl text-[#6c815e]"
                  aria-hidden="true"
                >
                  ♡
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#315c3b]">
                    Easy online shopping
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#777c6d]">
                    Add your selection to your cart whenever you're ready.
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#315c3b] transition hover:text-[#1f4029] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b]"
            >
              <span aria-hidden="true">←</span>
              Continue exploring products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailsPage;