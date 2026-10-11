
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
  country: ""
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
          totalAmount: payload.totalAmount ?? payload.cart.totalAmount
        };
      }

      setCart({
        items: Array.isArray(payload?.items) ? payload.items : [],
        totalItems: payload?.totalItems ?? 0,
        totalAmount: payload?.totalAmount ?? 0
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
      [name]: value
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
        // The server may have created the order but returned an
        // unexpected response. Avoid automatically submitting again.
        setError(
          "The order response did not include an order ID. Check My Orders before retrying."
        );
        return;
      }

      navigate(`/orders/${orderId}`, {
        replace: true,
        state: { orderJustCreated: true }
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loadingCart) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-5" role="status">Loading your cart…</p>
      </main>
    );
  }

  if (!cart && error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-5 text-red-600" role="alert">{error}</p>
        <button
          type="button"
          onClick={loadCart}
          className="mt-3 underline"
        >
          Retry
        </button>
      </main>
    );
  }

  if (!cart?.items?.length) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-5">Your cart is empty.</p>
        <Link to="/products" className="mt-3 inline-block underline">
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-xl border p-5">
          <ShippingAddressForm
            value={address}
            onChange={handleAddressChange}
            onSubmit={handlePlaceOrder}
            disabled={placingOrder}
            
          >
            <div className="mt-6">
              <PlaceOrderButton
                loading={placingOrder}
                disabled={!cart.items.length}
              />
            </div>
          </ShippingAddressForm>
        </section>

        <OrderSummary
          items={cart.items}
          totalItems={cart.totalItems}
          totalAmount={cart.totalAmount}
        />
      </div>
    </main>
  );
}

export default CheckoutPage;

