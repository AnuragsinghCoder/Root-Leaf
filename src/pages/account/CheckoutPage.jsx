import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartApi from "../../services/cartApi";
import orderApi from "../../services/orderApi";
import ShippingAddressForm from "../../components/order/ShippingAddressForm";
import OrderSummary from "../../components/order/OrderSummary";
import PlaceOrderButton from "../../components/order/PlaceOrderButton";

const initialAddress = {
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

function getPayload(response) {
  return response?.data ?? response;
}

function getErrorMessage(error) {
  return error?.message || "Something went wrong. Please try again.";
}

function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState(initialAddress);
  const [loadingCart, setLoadingCart] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const loadCart = useCallback(async () => {
    setLoadingCart(true);
    setError("");

    try {
      const response = await cartApi.getCart();
      let payload = getPayload(response);

      if (payload?.cart) {
        payload = {
          ...payload.cart,
          totalItems: payload.totalItems ?? payload.cart.totalItems,
          totalAmount: payload.totalAmount ?? payload.cart.totalAmount,
        };
      }

      setCart({
        items: Array.isArray(payload?.items) ? payload.items : [],
        totalItems: payload?.totalItems ?? 0,
        totalAmount: payload?.totalAmount ?? 0,
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoadingCart(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleAddressChange = (name, value) => {
    setAddress((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (submittedAddress) => {
    if (placingOrder) return;

    if (!cart?.items?.length) {
      setError("Your cart is empty. Add products before placing an order.");
      return;
    }

    setPlacingOrder(true);
    setError("");

    try {
      const response = await orderApi.createOrder(submittedAddress);
      const payload = getPayload(response);

      const order =
        payload?.order ??
        payload?.data?.order ??
        payload?.data ??
        payload;

      const orderId = order?._id || order?.id;

      if (!orderId) {
        setError(
          "The order response did not include an order ID. Check My Orders before retrying."
        );
        return;
      }

      navigate(`/orders/${orderId}`, {
        replace: true,
        state: { orderJustCreated: true },
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loadingCart) {
    return (
      <main className="min-h-[60vh] bg-[#faf9f4] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div
            className="flex items-center gap-3 text-[#52684a]"
            role="status"
          >
            <span
              className="h-5 w-5 animate-spin rounded-full border-2 border-[#d8dfcf] border-t-[#315c3b]"
              aria-hidden="true"
            />
            <p>Preparing your checkout...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!cart && error) {
    return (
      <main className="min-h-[60vh] bg-[#faf9f4] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#e7e4d9] bg-white p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6c815e]">
            Root & Leaf
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#243b2a]">
            Checkout
          </h1>

          <p className="mt-4 text-sm leading-6 text-red-700" role="alert">
            {error}
          </p>

          <button
            type="button"
            onClick={loadCart}
            className="mt-6 rounded-full bg-[#315c3b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24482e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b]"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!cart?.items?.length) {
    return (
      <main className="min-h-[60vh] bg-[#faf9f4] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#e7e4d9] bg-white px-6 py-12 text-center sm:px-12">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f3e9] text-3xl"
            aria-hidden="true"
          >
            🌿
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[#243b2a]">
            Nothing to check out yet
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#777c6d]">
            Your basket is waiting for something good. Explore our collection
            and find products to love.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#315c3b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#24482e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b]"
          >
            Explore products
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f4] px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#777c6d]"
        >
          <Link
            to="/products"
            className="transition hover:text-[#315c3b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c3b]"
          >
            Shop
          </Link>

          <span aria-hidden="true">/</span>

          <span className="font-medium text-[#243b2a]">Checkout</span>
        </nav>

        {/* Page heading */}
        <div className="mb-9">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6c815e]">
            A little closer to nature
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#243b2a] sm:text-4xl">
            Complete your order
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#777c6d] sm:text-base">
            Add your delivery details and review your basket before placing
            your order.
          </p>
        </div>

        {/* Checkout progress */}
        <ol
          aria-label="Checkout progress"
          className="mb-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#e7e4d9] bg-white"
        >
          <li className="flex items-center gap-2 border-r border-[#e7e4d9] px-3 py-4 sm:gap-3 sm:px-5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf2e7] text-sm font-semibold text-[#315c3b]">
              ✓
            </span>
            <span className="text-xs font-medium text-[#52684a] sm:text-sm">
              Basket
            </span>
          </li>

          <li
            aria-current="step"
            className="flex items-center gap-2 border-r border-[#e7e4d9] bg-[#f1f4eb] px-3 py-4 sm:gap-3 sm:px-5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#315c3b] text-sm font-semibold text-white">
              2
            </span>
            <span className="text-xs font-semibold text-[#243b2a] sm:text-sm">
              Delivery
            </span>
          </li>

          <li className="flex items-center gap-2 px-3 py-4 sm:gap-3 sm:px-5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d9ddcf] text-sm text-[#777c6d]">
              3
            </span>
            <span className="text-xs font-medium text-[#777c6d] sm:text-sm">
              Confirmation
            </span>
          </li>
        </ol>

        {error && (
          <div
            className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Main checkout layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <section className="min-w-0 rounded-3xl border border-[#e7e4d9] bg-white p-5 shadow-[0_8px_32px_rgba(36,59,42,0.035)] sm:p-8">
            <div className="mb-7 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f3e9] text-[#315c3b]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21s7-4.4 7-11V5l-7-3-7 3v5c0 6.6 7 11 7 11Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m9 12 2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#243b2a] sm:text-2xl">
                  Delivery information
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#777c6d]">
                  Where should we send your order?
                </p>
              </div>
            </div>

            <ShippingAddressForm
              value={address}
              onChange={handleAddressChange}
              onSubmit={handlePlaceOrder}
              disabled={placingOrder}
            >
              <div className="mt-7 border-t border-[#e7e4d9] pt-6">
                <PlaceOrderButton
                  loading={placingOrder}
                  disabled={!cart.items.length}
                />

                <p className="mt-3 text-center text-xs leading-5 text-[#777c6d]">
                  Please check your delivery details before placing your order.
                </p>
              </div>
            </ShippingAddressForm>
          </section>

          <div className="min-w-0 lg:sticky lg:top-6">
            <OrderSummary
              items={cart.items}
              totalItems={cart.totalItems}
              totalAmount={cart.totalAmount}
            />

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#e7e4d9] bg-[#f1f4eb] p-4">
              <span className="text-lg" aria-hidden="true">
                🌱
              </span>
              <div>
                <p className="text-sm font-semibold text-[#315c3b]">
                  Thoughtfully chosen
                </p>
                <p className="mt-1 text-xs leading-5 text-[#66705e]">
                  Review your items and delivery details before confirming
                  your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;