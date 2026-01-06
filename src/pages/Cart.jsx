import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { CartItemsList, CartSummary, SuccessPopup } from "../components/cart";
import { useCart } from "../context";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Use Cart Context instead of local state
  const { cartItems, updateQuantity, removeItem: handleRemoveItem } = useCart();

  const handleQuantityChange = (id, delta) => {
    updateQuantity(id, delta);
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
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#212844] mb-2">
              {t("cart.emptyCart") || "Your cart is empty"}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("cart.emptyCartMessage") ||
                "Looks like you haven't added anything to your cart yet"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#FC813B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e6733a] transition-colors"
            >
              {t("cart.backToShopping")}
            </button>
          </div>
        ) : (
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
        )}
      </div>

      {/* Success Popup */}
      {showSuccessPopup && <SuccessPopup onContinue={handleContinue} />}

      <Footer />
    </div>
  );
};

export default Cart;
