
import apiClient from "./apiClient";

const getCart = async () => {
  return apiClient("/cart");
};

const addItem = async (productId, quantity = 1) => {
  return apiClient("/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity })
  });
};

const updateItemQuantity = async (productId, quantity) => {
  return apiClient(`/cart/items/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity })
  });
};

const removeItem = async (productId) => {
  return apiClient(`/cart/items/${productId}`, {
    method: "DELETE"
  });
};

const clearCart = async () => {
  return apiClient("/cart", {
    method: "DELETE"
  });
};

const cartApi = {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart
};

export default cartApi;