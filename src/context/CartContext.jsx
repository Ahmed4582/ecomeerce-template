import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on mount
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error loading cart from localStorage:", error);
      }
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems]);

  const addItem = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      );

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map((i) =>
          i.id === existingItem.id &&
          i.color === existingItem.color &&
          i.size === existingItem.size
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            ...item,
            quantity: item.quantity || 1,
          },
        ];
      }
    });
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const setQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (sum, item) =>
        sum + (item.individualPrice || item.price || 0) * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    setQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
