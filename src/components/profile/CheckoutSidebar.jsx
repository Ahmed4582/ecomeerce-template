import { useTranslation } from "react-i18next";
import { Camera, CreditCard } from "lucide-react";
import { useUser } from "../../context";

const CheckoutSidebar = ({
  subtotal,
  couponDiscount,
  discountAmount,
  shipping,
  total,
}) => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={`bg-white rounded-t-lg p-6 min-h-[810px] mt-[-100px] ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* User Profile Section */}
      <div className="mb-6">
        <div className="space-y-5 border-b border-gray-200 pb-5">
          <div className="flex justify-center items-center">
            <div className="relative inline-block mx-auto">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img
                  src="/images/man.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#FC813B] rounded-full flex items-center justify-center hover:bg-[#e6733a] transition-colors shadow-sm"
                aria-label={t("profile.edit") || "Edit profile picture"}
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          <div className=" text-center">
            <h3 className="text-lg font-bold text-[#212844] ">
              {user?.fullName || user?.name || t("profile.userName")}
            </h3>
            <p className="text-sm text-gray-600">{user?.email || t("profile.emailPlaceholder")}</p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="mb-6">
        <h3
          className="text-xl font-light  text-[#212844] mb-4 text-center"
        >
          {t("profile.orderDetails")}
        </h3>
        <div className="space-y-8">
          <div
            className={`flex justify-between ${
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
              className={`flex justify-between ${
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
            className={`flex justify-between ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-gray-600">{t("cart.shipping")}</span>
            <span className="font-semibold text-[#FC813B]">
              ${shipping.toFixed(1)}
            </span>
          </div>
          <div
            className={`border-t-2 border-gray-200 pt-8 flex justify-between items-center ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span className="font-semibold text-[#212844]">
              {t("cart.total")} (USD)
            </span>
            <span className="text-lg font-bold text-[#FC813B]">
              ${total.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border-t-2 border-gray-200 pt-2 mt-2">
        <h3
          className={`text-lg font-light text-[#212844] mb-3 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("cart.selectPaymentMethod")}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="p-2 border-2 border-gray-300 rounded-lg hover:border-[#FC813B] transition-colors"
          >
            <img
              src="/SVG/card.svg"
              alt="Payment"
              className="w-12 h-8 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
