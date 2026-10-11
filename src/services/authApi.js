import apiClient from "./apiClient";

const register = async ({ name, email, password }) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password
    })
  });
};

const login = async ({ email, password }) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  });
};

const getCurrentUser = async () => {
  return apiClient("/auth/me");
};

const authApi = {
  register,
  login,
  getCurrentUser
};

export default authApi;