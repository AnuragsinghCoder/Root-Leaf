
import apiClient from "./apiClient";

const getCategories = () => apiClient("/categories");

const getAllCategories = () => apiClient("/categories/admin/all");

const createCategory = (category) =>
  apiClient("/categories", {
    method: "POST",
    body: JSON.stringify(category),
  });

const updateCategory = (id, category) =>
  apiClient(`/categories/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });

const deactivateCategory = (id) =>
  apiClient(`/categories/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

export default {
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deactivateCategory,
};
