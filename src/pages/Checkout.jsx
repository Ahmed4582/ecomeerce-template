import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context";
import { useTranslation } from "react-i18next";
import SuccessPopup from "../components/cart/SuccessPopup";
import { useCreateOrder } from "../hooks/ordersHooks";

const Checkout = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { items, totals, clearCart } = useCart();
  const isRTL = i18n.language === "ar";
  const createOrder = useCreateOrder();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // TODO: Apply coupon logic via API
      setCouponDiscount(10); // Placeholder
    }
  };

  const handleSubmit = async () => {
    if (!address || !phone) {
      alert("Please fill all fields");
      return;
    }

    // Map cart items to backend-friendly payload
    const products = items.map((i) => ({
      product_Id: i.productId,
      variant_Id: i.variantId,
      quantity: i.quantity,
    }));

    try {
      const res = await createOrder.mutateAsync({
        amount: finalTotal,
        products,
        notes: `phone:${phone}; payment:${selectedPayment}; coupon:${couponCode || ""}`,
        shipping_Address: address,
      });

      // API returns { isSuccess, paymentUrl, ... } under `data` already normalized by axiosClient
      if (res?.paymentUrl) {
        // Redirect to payment gateway
        window.location.href = res.paymentUrl;
        return;
      }

      clearCart();
      setShowSuccess(true);
    } catch (err) {
      alert(err?.message || "Failed to create order");
    }
  };

  const handleContinue = () => {
    setShowSuccess(false);
    navigate("/");
  };

  return (
    <>
      <div className="bg-background-light-gray min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {/* Page Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">
              {t("cart.checkout", { defaultValue: "Checkout" })}
            </h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left - Shipping Info */}
            <div className="lg:col-span-8">
              <div className="bg-background-white rounded-2xl shadow-card p-6">
                <h2 className="text-xl font-bold text-text-primary mb-6">
                  {t("cart.shippingInfo", { defaultValue: "Shipping Information" })}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t("cart.address", { defaultValue: "Address" })}
                    </label>
                    <input
                      placeholder={t("cart.addressPlaceholder", {
                        defaultValue: "Enter your address",
                      })}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-input-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      {t("cart.phone", { defaultValue: "Phone Number" })}
                    </label>
                    <input
                      type="tel"
                      placeholder={t("cart.phonePlaceholder", {
                        defaultValue: "Enter your phone number",
                      })}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-input-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Cart Total */}
            <div className="lg:col-span-4">
              <div className="bg-background-white rounded-2xl shadow-card p-6 sticky top-8">
                <h2
                  className={`text-xl font-bold text-text-primary mb-6 border-b-2 border-gray-200 pb-4 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("cart.cartTotal", { defaultValue: "Cart Total" })}
                </h2>

                {/* Coupon Section */}
                <div className="mb-6">
                  <h3
                    className={`text-base font-medium text-text-secondary mb-3 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("cart.couponApply", { defaultValue: "Coupon Apply" })}
                  </h3>
                  <div className="flex w-full border-2 border-brand-primary rounded-xl overflow-hidden">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t("cart.enterCouponCode", {
                        defaultValue: "Enter Coupon Code",
                      })}
                      className="flex-1 px-4 py-2 text-sm bg-gray-50 text-text-secondary border-0 focus:outline-none"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-6 py-2 text-sm bg-brand-primary text-white font-semibold hover:bg-brand-primary-hover transition-colors whitespace-nowrap"
                    >
                      {t("cart.apply", { defaultValue: "Apply" })}
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.variantId}
                      className={`flex justify-between text-text-secondary text-sm ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium text-text-primary">
                        {typeof item.price === "number"
                          ? (item.price * item.quantity).toFixed(2)
                          : "—"}{" "}
                        EGP
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div
                    className={`flex justify-between text-sm text-text-secondary ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span>{t("cart.subtotal", { defaultValue: "Subtotal" })}</span>
                    <span className="font-semibold text-brand-primary">
                      {typeof totals.subtotal === "number"
                        ? totals.subtotal.toFixed(2)
                        : "—"}{" "}
                      EGP
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div
                      className={`flex justify-between text-sm text-text-secondary ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span>
                        {t("cart.couponDiscount", { defaultValue: "Coupon Discount" })}{" "}
                        {couponDiscount}%
                      </span>
                      <span className="font-semibold text-brand-primary">
                        {discountAmount.toFixed(2)} EGP
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex justify-between text-sm text-text-secondary ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span>{t("cart.shipping", { defaultValue: "Shipping" })}</span>
                    <span className="font-semibold text-brand-primary">
                      {shipping.toFixed(2)} EGP
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div
                  className={`border-t-2 border-gray-200 pt-4 mb-6 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`flex justify-between items-center text-lg font-bold text-text-primary ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <span>{t("cart.total", { defaultValue: "Total" })} (USD)</span>
                    <span className="text-xl text-brand-primary">
                      {finalTotal.toFixed(2)} EGP
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h3
                    className={`text-base font-semibold text-text-primary mb-3 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("cart.selectPaymentMethod", {
                      defaultValue: "Select Payment Method",
                    })}
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
                <div className="space-y-3">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-lg text-base font-semibold transition-colors"
                  >
                    {t("cart.checkout", { defaultValue: "Checkout" })}
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-text-primary px-6 py-3 rounded-lg text-base font-semibold transition-colors"
                  >
                    {t("cart.backToShopping", { defaultValue: "Back to shopping" })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Popup */}
      {showSuccess && <SuccessPopup onContinue={handleContinue} />}
    </>
  );
};

export default Checkout;
