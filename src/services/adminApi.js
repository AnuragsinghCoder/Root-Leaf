import apiClient from "./apiClient";

const getProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiClient(`/products${query ? `?${query}` : ""}`);
};

const createProduct = (product) =>
  apiClient("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

const updateProduct = (id, product) =>
  apiClient(`/products/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

const deleteProduct = (id) =>
  apiClient(`/products/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

// Confirm these two paths and the request body against your order router.
const getAdminOrders = () => apiClient("/orders/admin/all");

const updateOrderStatus = (id, orderStatus) =>
  apiClient(`/orders/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    body: JSON.stringify({ orderStatus }),
  });

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateOrderStatus,
};