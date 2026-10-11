
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth  from "../../hooks/useAuth";
import cartApi from "../../services/cartApi";

function AddToCartButton({
  product,
  quantity = 1,
  className = ""
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login", {
        state: { from: "/cart" }
      });
      return;
    }

    if (!product?._id || product.stock < 1) {
      setError("This product is currently out of stock.");
      return;
    }

    if (quantity > product.stock) {
      setError("Requested quantity exceeds available stock.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await cartApi.addItem(product._id, quantity);
      setSuccess("Added to cart.");
    } catch (err) {
      setError(
        err?.message || "Unable to add this product to your cart."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={loading || !product || product.stock < 1}
        className="w-full rounded bg-black px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Adding…"
          : product?.stock > 0
            ? "Add to Cart"
            : "Out of Stock"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {success && (
        <div className="mt-2 text-sm text-green-700" role="status">
          {success}{" "}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="underline"
          >
            View cart
          </button>
        </div>
      )}
    </div>
  );
}

export default AddToCartButton;