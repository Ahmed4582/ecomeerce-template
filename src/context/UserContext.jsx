import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Load user from localStorage or default to null
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error loading user from localStorage:", error);
      }
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error saving user to localStorage:", error);
      }
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const updateUser = (userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

