import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext(null);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
};

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  SAR: "ر.س",
  AED: "د.إ",
  EGP: "ج.م",
};

const CURRENCY_NAMES = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  SAR: "Saudi Riyal",
  AED: "UAE Dirham",
  EGP: "Egyptian Pound",
};

export const CurrencyProvider = ({ children }) => {
  // Load currency from localStorage or default to USD
  const [currency, setCurrency] = useState(() => {
    try {
      const savedCurrency = localStorage.getItem("currency");
      return savedCurrency || "USD";
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error loading currency from localStorage:", error);
      }
      return "USD";
    }
  });

  // Save currency to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("currency", currency);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error saving currency to localStorage:", error);
      }
    }
  }, [currency]);

  const changeCurrency = (newCurrency) => {
    if (CURRENCY_SYMBOLS[newCurrency]) {
      setCurrency(newCurrency);
    }
  };

  const formatPrice = (price) => {
    const symbol = CURRENCY_SYMBOLS[currency] || "$";
    // TODO: Add currency conversion logic when API is available
    return `${price.toFixed(2)}${symbol}`;
  };

  const getSymbol = () => {
    return CURRENCY_SYMBOLS[currency] || "$";
  };

  const getCurrencyName = () => {
    return CURRENCY_NAMES[currency] || "US Dollar";
  };

  const value = {
    currency,
    changeCurrency,
    formatPrice,
    getSymbol,
    getCurrencyName,
    availableCurrencies: Object.keys(CURRENCY_SYMBOLS),
  };

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
};

