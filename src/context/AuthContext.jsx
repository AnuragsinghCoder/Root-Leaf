import { createContext, useCallback, useEffect, useState } from "react";

import authApi from "../services/authApi";
import {
  getStoredToken,
  removeStoredToken,
  setStoredToken
} from "../services/apiClient";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getStoredToken);
  const [loading, setLoading] = useState(true);

  const clearAuthentication = useCallback(() => {
    removeStoredToken();
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const storedToken = getStoredToken();

    if (!storedToken) {
      setToken(null);
      setUser(null);
      return null;
    }

    try {
      const response = await authApi.getCurrentUser();

      const currentUser = response?.data?.user ?? response?.data;

      setToken(storedToken);
      setUser(currentUser);

      return currentUser;
    } catch (error) {
      clearAuthentication();
      return null;
    }
  }, [clearAuthentication]);

  const login = async ({ email, password }) => {
    const response = await authApi.login({
      email,
      password
    });

    const receivedToken = response?.data?.token;
    const loggedInUser = response?.data?.user;

    if (!receivedToken || !loggedInUser) {
      throw new Error("Invalid login response from server.");
    }

    setStoredToken(receivedToken);
    setToken(receivedToken);
    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async ({ name, email, password }) => {
    const response = await authApi.register({
      name,
      email,
      password
    });

    const receivedToken = response?.data?.token;
    const registeredUser = response?.data?.user;

    if (!receivedToken || !registeredUser) {
      throw new Error("Invalid registration response from server.");
    }

    setStoredToken(receivedToken);
    setToken(receivedToken);
    setUser(registeredUser);

    return registeredUser;
  };

  const logout = () => {
    clearAuthentication();
  };

  useEffect(() => {
    const restoreAuthentication = async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };

    restoreAuthentication();
  }, [refreshUser]);

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;