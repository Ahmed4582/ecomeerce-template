import React, { useState } from "react";
import { useCart } from "../context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { items, removeItem, updateQuantity, totals } = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("visa");

  const shipping = 10.0;
  const discountAmount =
    couponDiscount > 0 && typeof totals.subtotal === "number"
      ? (totals.subtotal * couponDiscount) / 100
      : 0;
  const finalTotal =
    typeof totals.subtotal === "number"
      ? totals.subtotal - discountAmount + shipping
      : 0;

  const handleRemoveItem = (variantId) => {
    removeItem(variantId);
  };

  const handleUpdateQuantity = (variantId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(variantId);
      return;
    }
    updateQuantity(variantId, newQuantity);
  };

  const handleDecrease = (item) => {
    handleUpdateQuantity(item.variantId, item.quantity - 1);
  };

  const handleIncrease = (item) => {
    handleUpdateQuantity(item.variantId, item.quantity + 1);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // TODO: Apply coupon logic via API
      setCouponDiscount(10); // Placeholder
    }
  };

  return (
    <div className="bg-background-light-gray min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">
            {t("common.myCart") || "My cart"}
          </h1>
          {items.length > 0 && (
            <p className="text-text-secondary mt-2">
              {t("cart.itemsInCart", {
                count: items.length,
                defaultValue: `${items.length} items in your cart`,
              })}
            </p>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-background-white rounded-2xl shadow-card p-8 sm:p-12 lg:p-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                {t("cart.emptyCart") || "Your cart is empty"}
              </h2>
              <p className="text-text-secondary mb-8">
                {t("cart.emptyCartMessage") ||
                  "Looks like you haven't added anything to your cart yet"}
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-3 rounded-button font-semibold transition-colors"
              >
                {t("cart.backToShopping") || "Back to Shopping"}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="bg-background-white rounded-lg p-4 sm:p-6 flex flex-row gap-4 sm:gap-6"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/images/watchimg.png";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4 min-w-0">
                    <div className="flex-1 flex flex-col gap-1">
                      <h3 className="text-base sm:text-lg font-semibold text-[#212844] truncate">
                        {item.name}
                      </h3>
                      <div className="text-sm text-black">
                        <p>
                          {t("cart.color") || "Color"}:{" "}
                          <span className="text-gray-400 font-semibold">
                            {item.color || "N/A"}
                          </span>
                        </p>
                        <p>
                          {t("cart.size") || "Size"}:{" "}
                          <span className="text-gray-400 font-semibold">
                            {item.size || "N/A"}
                          </span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleDecrease(item)}
                            disabled={item.quantity <= 1}
                            className={`p-1.5 sm:p-2 transition-colors ${
                              item.quantity <= 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            aria-label={t("cart.decreaseQuantity") || "Decrease quantity"}
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-10 sm:w-12 text-center border-0 bg-white text-sm sm:text-base px-2 py-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item)}
                            className="p-1.5 sm:p-2 bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors"
                            aria-label={t("cart.increaseQuantity") || "Increase quantity"}
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price Info & Remove */}
                    <div className="flex flex-row sm:flex-row items-center gap-4 sm:gap-8">
                      {/* Price Info */}
                      <div className="flex flex-row gap-6 sm:gap-8">
                        <div className="flex flex-col">
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">
                            {t("cart.individualPrice") || "Individual price"}
                          </p>
                          <p className="text-xl font-normal text-brand-primary">
                            ${typeof item.price === "number" ? item.price.toFixed(1) : "0.0"}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">
                            {t("cart.totalPrice") || "Total Price"}
                          </p>
                          <p className="text-xl font-normal text-brand-primary">
                            $
                            {typeof item.price === "number"
                              ? (item.price * item.quantity).toFixed(1)
                              : "0.0"}
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.variantId)}
                        className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-2"
                        aria-label={t("cart.removeItem") || "Remove item"}
                      >
                        <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Total Section */}
            <div className="lg:col-span-4">
              <div className="bg-background-white rounded-lg p-4 sm:p-5 md:p-6 sticky top-8">
                <h2
                  className={`text-xl sm:text-2xl font-normal text-[#212844] mb-4 sm:mb-6 border-b-2 border-gray-200 pb-4 sm:pb-6 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("cart.cartTotal") || "Cart Total"}
                </h2>

                {/* Coupon Section */}
                <div className="mb-4 sm:mb-6">
                  <h3
                    className={`text-base sm:text-lg font-normal text-gray-600 mb-2 sm:mb-3 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("cart.couponApply") || "Coupon Apply"}
                  </h3>
                  <div className="flex w-full border-2 border-brand-primary rounded-xl overflow-hidden">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t("cart.enterCouponCode") || "Enter Coupon Code"}
                      className="flex-1 px-4 py-2 text-sm sm:text-base bg-gray-50 text-text-secondary border-0 focus:outline-none"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-6 sm:px-8 py-2 text-sm sm:text-base bg-brand-primary text-white font-semibold hover:bg-brand-primary-hover transition-colors whitespace-nowrap"
                    >
                      {t("cart.apply") || "Apply"}
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div
                    className={`flex justify-between text-sm sm:text-base ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-gray-600">{t("cart.subtotal") || "Subtotal"}</span>
                    <span className="font-semibold text-brand-primary">
                      $
                      {typeof totals.subtotal === "number"
                        ? totals.subtotal.toFixed(1)
                        : "0.0"}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div
                      className={`flex justify-between text-sm sm:text-base ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span className="text-gray-600">
                        {t("cart.couponDiscount") || "Coupon Discount"} {couponDiscount}%
                      </span>
                      <span className="font-semibold text-brand-primary">
                        ${discountAmount.toFixed(1)}
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex justify-between text-sm sm:text-base ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-gray-600">{t("cart.shipping") || "Shipping"}</span>
                    <span className="font-semibold text-brand-primary">
                      ${shipping.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div
                  className={`border-t-2 border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`flex justify-between items-center border-b-2 border-gray-200 pb-4 sm:pb-6 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-base sm:text-lg font-semibold text-[#212844]">
                      {t("cart.total") || "Total"} (USD)
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-brand-primary">
                      ${finalTotal.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-4 sm:mb-6">
                  <h3
                    className={`text-base sm:text-lg font-semibold text-[#212844] mb-2 sm:mb-3 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("cart.selectPaymentMethod") || "Select Payment Method"}
                  </h3>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {/* VISA/Mastercard */}
                    <button
                      onClick={() => setSelectedPayment("visa")}
                      className={`p-2 sm:p-3 border-2 rounded-lg transition-colors ${
                        selectedPayment === "visa"
                          ? "border-blue-500 bg-gray-100"
                          : "border-gray-300 hover:border-brand-primary"
                      }`}
                      aria-label="Select VISA/Mastercard payment method"
                    >
                      <img
                        src="/SVG/card.svg"
                        alt="VISA/Mastercard"
                        className="w-10 h-6 sm:w-12 sm:h-8 object-contain"
                      />
                    </button>
                    {/* Another Card */}
                    <button
                      onClick={() => setSelectedPayment("amex")}
                      className={`p-2 sm:p-3 border-2 rounded-lg transition-colors ${
                        selectedPayment === "amex"
                          ? "border-blue-500 bg-gray-100"
                          : "border-gray-300 hover:border-brand-primary"
                      }`}
                      aria-label="Select card payment method"
                    >
                      <img
                        src="/SVG/card.svg"
                        alt="Card"
                        className="w-10 h-6 sm:w-12 sm:h-8 object-contain"
                      />
                    </button>
                    {/* Cash on delivery */}
                    <button
                      onClick={() => setSelectedPayment("cash")}
                      className={`p-2 sm:p-3 border-2 rounded-lg transition-colors flex items-center justify-center ${
                        selectedPayment === "cash"
                          ? "border-blue-500 bg-gray-100"
                          : "border-gray-300 hover:border-brand-primary"
                      }`}
                      aria-label="Select cash on delivery payment method"
                    >
                      <img
                        src="/SVG/cash.svg"
                        alt="Cash on delivery"
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-brand-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-brand-primary-hover transition-colors"
                  >
                    {t("cart.checkout") || "Checkout"}
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full bg-gray-200 text-[#212844] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {t("cart.backToShopping") || "Back to shopping"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
