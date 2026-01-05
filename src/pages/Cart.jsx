import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { CartItemsList, CartSummary, SuccessPopup } from "../components/cart";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "/images/watchimg.png",
      name: "Apple Watch Ultra 2",
      color: "red",
      size: "small",
      quantity: 0,
      individualPrice: 250.0,
    },
    {
      id: 2,
      image: "/images/watchimg.png",
      name: "Apple Watch Ultra 2",
      color: "red",
      size: "small",
      quantity: 0,
      individualPrice: 250.0,
    },
    {
      id: 3,
      image: "/images/watchimg.png",
      name: "Apple Watch Ultra 2",
      color: "red",
      size: "small",
      quantity: 0,
      individualPrice: 250.0,
    },
    {
      id: 4,
      image: "/images/watchimg.png",
      name: "Apple Watch Ultra 2",
      color: "red",
      size: "small",
      quantity: 0,
      individualPrice: 250.0,
    },
    {
      id: 5,
      image: "/images/watchimg.png",
      name: "Apple Watch Ultra 2",
      color: "red",
      size: "small",
      quantity: 0,
      individualPrice: 250.0,
    },
    {
      id: 6,
      image: "/images/watchimg.png",
      name: "Apple Watch Ultra 2",
      color: "red",
      size: "small",
      quantity: 0,
      individualPrice: 250.0,
    },
    {
      id: 7,
      image: "/images/watchimg.png",
      name: "Apple Watch Ultra 2",
      color: "red",
      size: "small",
      quantity: 0,
      individualPrice: 250.0,
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.individualPrice * item.quantity,
    0
  );
  // Show 10% discount if subtotal > 0
  const couponDiscount = subtotal > 0 ? 10 : 0;
  const discountAmount = (subtotal * couponDiscount) / 100;
  const shipping = 10.0;
  const total = subtotal - discountAmount + shipping;

  const handleCheckout = () => {
    setShowSuccessPopup(true);
  };

  const handleContinue = () => {
    setShowSuccessPopup(false);
    navigate("/");
  };

  return (
    <div className="bg-background-light-gray min-h-screen">
      <Header />
      <div className="px-4 sm:px-10 lg:px-16 py-8 lg:py-10">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 "
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Left: Cart Items */}
          <CartItemsList
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />

          {/* Right: Cart Summary */}
          <CartSummary
            subtotal={subtotal}
            couponDiscount={couponDiscount}
            discountAmount={discountAmount}
            shipping={shipping}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && <SuccessPopup onContinue={handleContinue} />}

      <Footer />
    </div>
  );
};

export default Cart;
