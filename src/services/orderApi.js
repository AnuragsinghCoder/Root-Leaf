
import apiClient from "./apiClient";

const createOrder = async (shippingAddress) => {
  return apiClient("/orders", {
    method: "POST",
    body: JSON.stringify({ shippingAddress })
  });
};

const getMyOrders = async () => {
  return apiClient("/orders/my-orders");
};

const getOrderById = async (orderId) => {
  return apiClient(`/orders/${encodeURIComponent(orderId)}`);
};

const orderApi = {
  createOrder,
  getMyOrders,
  getOrderById
};

export default orderApi;
