import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CartSummary = ({
  subtotal,
  couponDiscount,
  discountAmount,
  shipping,
  total,
  onCheckout,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("visa");

  return (
    <div
      className={`lg:col-span-3 ${
        isRTL ? "order-1" : "order-2"
      } bg-white rounded-lg p-4 sm:p-5 md:p-6 space-y-10`}
    >
      <h2
        className={`text-xl sm:text-3xl font-normal text-[#212844] mb-4 sm:mb-6 border-b-2 border-gray-200 pb-4 sm:pb-6 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {t("cart.cartTotal")}
      </h2>

      {/* Coupon Section */}
      <div className="mb-4 sm:mb-6">
        <h3
          className={`text-base sm:text-lg font-normal text-gray-600 mb-2 sm:mb-3 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("cart.couponApply")}
        </h3>
        <div className="flex w-full border-2 border-[#FC813B] rounded-xl overflow-hidden">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder={t("cart.enterCouponCode")}
            className="flex-1 px-4 py-2 text-sm sm:text-base bg-[#fafafa] text-gray-500 border-0 focus:outline-none focus:ring-0 focus:border-0 placeholder-gray-400"
            style={{ borderRadius: 0 }}
          />
          <button
            onClick={() => {
              if (couponCode) {
                // Apply coupon logic here
              }
            }}
            className="px-8 py-2 text-sm sm:text-base bg-[#FC813B] text-white font-semibold hover:bg-[#e6733a] transition-colors whitespace-nowrap "
            style={{
              borderTopRightRadius: '0.5rem',
              borderBottomRightRadius: '0.5rem'
            }}
          >
            {t("cart.apply")}
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
          <span className="text-gray-600">{t("cart.subtotal")}</span>
          <span className="font-semibold text-[#FC813B]">
            ${subtotal.toFixed(1)}
          </span>
        </div>
        {couponDiscount > 0 && (
          <div
            className={`flex justify-between text-sm sm:text-base ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-gray-600">
              {t("cart.couponDiscount")} {couponDiscount}%
            </span>
            <span className="font-semibold text-[#FC813B]">
              ${discountAmount.toFixed(1)}
            </span>
          </div>
        )}
        <div
          className={`flex justify-between text-sm sm:text-base ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <span className="text-gray-600">{t("cart.shipping")}</span>
          <span className="font-semibold text-[#FC813B]">
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
          <span className="text-base sm:text-lg font-semibold text-[#212844] ">
            {t("cart.total")} (USD)
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[#FC813B]">
            ${total.toFixed(1)}
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
          {t("cart.selectPaymentMethod")}
        </h3>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {/* VISA/Mastercard */}
          <button
            onClick={() => setSelectedPayment("visa")}
            className={`p-2 sm:p-3 border-2 rounded-lg transition-colors ${
              selectedPayment === "visa"
                ? "border-blue-500 bg-gray-100"
                : "border-gray-300 hover:border-[#FC813B]"
            }`}
          >
            <img
              src="/SVG/card.svg"
              alt="VISA/Mastercard"
              className="w-10 h-6 sm:w-12 sm:h-8 object-contain"
            />
          </button>
          {/* American Express */}
          <button
            onClick={() => setSelectedPayment("amex")}
            className={`p-2 sm:p-3 border-2 rounded-lg transition-colors ${
              selectedPayment === "amex"
                ? "border-blue-500 bg-gray-100"
                : "border-gray-300 hover:border-[#FC813B]"
            }`}
          >
            <img
              src="/SVG/card.svg"
              alt="American Express"
              className="w-10 h-6 sm:w-12 sm:h-8 object-contain"
            />
          </button>
          {/* Cash on delivery */}
          <button
            onClick={() => setSelectedPayment("cash")}
            className={`p-2 sm:p-3 border-2 rounded-lg transition-colors flex items-center justify-center ${
              selectedPayment === "cash"
                ? "border-blue-500 bg-gray-100"
                : "border-gray-300 hover:border-[#FC813B]"
            }`}
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
          onClick={onCheckout}
          className="w-full bg-[#FC813B] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#e6733a] transition-colors"
        >
          {t("cart.checkout")}
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-200 text-[#212844] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-300 transition-colors"
        >
          {t("cart.backToShopping")}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;

