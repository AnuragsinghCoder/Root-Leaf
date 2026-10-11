import apiClient from "./apiClient";

const getProducts = async ({
  search = "",
  category = "",
  sort = "-createdAt",
  page = 1,
  limit = 12
} = {}) => {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (category) {
    params.set("category", category);
  }

  if (sort) {
    params.set("sort", sort);
  }

  params.set("page", page);
  params.set("limit", limit);

  return apiClient(`/products?${params.toString()}`);
};

const getProductById = async (productId) => {
  return apiClient(`/products/${productId}`);
};

const productApi = {
  getProducts,
  getProductById
};

export default productApi;