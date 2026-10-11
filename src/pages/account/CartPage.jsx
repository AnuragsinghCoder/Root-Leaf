import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import cartApi from "../../services/cartApi";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

function getCartPayload(response) {
  let payload = response?.data ?? response;

  if (payload?.cart) {
    payload = payload.cart;
  }

  return payload;
}

function getErrorMessage(error) {
  return error?.message || "Something went wrong. Please try again.";
}

function CartPage() {
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    totalAmount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyProductId, setBusyProductId] = useState("");
  const [clearing, setClearing] = useState(false);

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await cartApi.getCart();
      const payload = getCartPayload(response);

      setCart({
        items: Array.isArray(payload?.items) ? payload.items : [],
        totalItems: payload?.totalItems ?? 0,
        totalAmount: payload?.totalAmount ?? 0,
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const updateQuantity = async (productId, quantity) => {
    setBusyProductId(productId);
    setError("");

    try {
      const response = await cartApi.updateItemQuantity(
        productId,
        quantity
      );

      const payload = getCartPayload(response);

      if (Array.isArray(payload?.items)) {
        setCart({
          items: payload.items,
          totalItems: payload.totalItems ?? 0,
          totalAmount: payload.totalAmount ?? 0,
        });
      } else {
        await loadCart();
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyProductId("");
    }
  };

  const removeItem = async (productId) => {
    setBusyProductId(productId);
    setError("");

    try {
      await cartApi.removeItem(productId);
      await loadCart();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyProductId("");
    }
  };

  const handleClearCart = async () => {
    setClearing(true);
    setError("");

    try {
      await cartApi.clearCart();
      await loadCart();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setClearing(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#faf8f1] px-4 py-16">
        <div className="text-center">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dce5d5] border-t-[#315c3b]"
            role="status"
            aria-label="Loading cart"
          />
          <h1 className="mt-5 text-xl font-semibold text-[#243b2a]">
            Preparing your basket
          </h1>
          <p className="mt-2 text-sm text-[#777c6d]">
            Just a moment while we fetch your cart.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f1] text-[#243b2a]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-[#777c6d]">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="transition hover:text-[#315c3b]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[#315c3b]">Your cart</li>
          </ol>
        </nav>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-b border-[#e5e3d7] pb-6 sm:mt-9 sm:pb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6c815e]">
              Your selection
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your shopping cart
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#777c6d]">
              Take a moment to review your chosen products.
            </p>
          </div>

          {cart.items.length > 0 && (
            <button
              type="button"
              onClick={handleClearCart}
              disabled={clearing || Boolean(busyProductId)}
              className="rounded-full border border-[#d8d8c9] px-4 py-2.5 text-sm font-medium text-[#59634f] transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c3b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {clearing ? "Clearing cart..." : "Clear cart"}
            </button>
          )}
        </div>

        {error && (
          <div
            className="mt-6 flex flex-col justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center"
            role="alert"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={loadCart}
              className="shrink-0 self-start font-semibold underline underline-offset-4 sm:self-auto"
            >
              Try again
            </button>
          </div>
        )}

        {cart.items.length === 0 ? (
          <section className="mx-auto mt-8 max-w-2xl rounded-[1.75rem] border border-[#e7e4d9] bg-white px-5 py-12 text-center sm:mt-10 sm:px-12 sm:py-16">
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#edf2e7] text-4xl text-[#315c3b]"
              aria-hidden="true"
            >
              ♧
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#6c815e]">
              A fresh start
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Your cart is waiting
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#777c6d]">
              Your basket is empty for now. Explore our collection and find
              something that belongs in your everyday routine.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#315c3b] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#24482e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b]"
            >
              Explore products
            </Link>
          </section>
        ) : (
          <div className="mt-7 grid items-start gap-6 lg:mt-9 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-8">
            <section aria-label="Cart items" className="min-w-0 space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-lg font-semibold">Your items</h2>
                <span className="text-sm text-[#777c6d]">
                  {cart.totalItems}{" "}
                  {cart.totalItems === 1 ? "item" : "items"}
                </span>
              </div>

              {cart.items.map((item, index) => {
                const productId =
                  typeof item.product === "string"
                    ? item.product
                    : item.product?._id;

                return (
                  <CartItem
                    key={productId || `cart-item-${index}`}
                    item={item}
                    busy={clearing || busyProductId === productId}
                    onQuantityChange={(quantity) =>
                      updateQuantity(productId, quantity)
                    }
                    onRemove={() => removeItem(productId)}
                  />
                );
              })}

              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-1 pt-2 text-sm font-semibold text-[#315c3b] transition hover:text-[#1f4029] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c3b]"
              >
                <span aria-hidden="true">←</span>
                Continue shopping
              </Link>
            </section>

            <CartSummary
              totalItems={cart.totalItems}
              totalAmount={cart.totalAmount}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;