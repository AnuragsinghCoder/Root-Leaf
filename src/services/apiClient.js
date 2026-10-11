const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TOKEN_KEY = "token";

if (!API_BASE_URL) {
  console.warn(
    "VITE_API_BASE_URL is not configured. API requests will not work."
  );
}

export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setStoredToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const apiClient = async (path, options = {}) => {
  const token = getStoredToken();

  const headers = new Headers(options.headers || {});

  headers.set("Accept", "application/json");

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  let data = null;

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = new Error(
      data?.error?.message || "Something went wrong with the API request."
    );

    error.status = response.status;
    error.code = data?.error?.code;

    throw error;
  }

  return data;
};

export default apiClient;