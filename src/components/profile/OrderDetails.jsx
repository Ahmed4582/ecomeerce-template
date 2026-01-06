import { useTranslation } from "react-i18next";
import CheckoutSidebar from "./CheckoutSidebar";
import { useNavigate } from "react-router-dom";

const OrderDetails = ({ orderId }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  // Sample order items
  const orderItems = [
    {
      id: 1,
      image: "/images/watchimg.png",
      name: t("product.appleWatchTitle"),
      color: "red",
      size: "small",
      individualPrice: 250.0,
      quantity: 1,
    },
    {
      id: 2,
      image: "/images/watchimg.png",
      name: t("product.appleWatchTitle"),
      color: "red",
      size: "small",
      individualPrice: 250.0,
      quantity: 1,
    },
    {
      id: 3,
      image: "/images/watchimg.png",
      name: t("product.appleWatchTitle"),
      color: "red",
      size: "small",
      individualPrice: 250.0,
      quantity: 1,
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.individualPrice * item.quantity,
    0
  );
  const couponDiscount = 10;
  const discountAmount = (subtotal * couponDiscount) / 100;
  const shipping = 10.0;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left Sidebar */}
      <div
        className={`lg:col-span-3 ${isRTL ? "order-2 lg:order-1" : "order-1"}`}
      >
        <CheckoutSidebar
          subtotal={subtotal}
          couponDiscount={couponDiscount}
          discountAmount={discountAmount}
          shipping={shipping}
          total={total}
        />
      </div>

      {/* Right Content - Order Items */}
      <div
        className={`lg:col-span-9 ${isRTL ? "order-1 lg:order-2" : "order-2"}`}
      >
        <div className="bg-white rounded-t-lg p-6 sm:p-7">
          {/* Back Button */}
          <button
            onClick={() => navigate("/profile/orders")}
            className={`mb-6 flex items-center gap-2 text-[#FC813B] hover:text-[#e6733a] transition-colors ${
              isRTL ? "flex-row-reverse" : ""
            }`}
            aria-label={t("profile.backToOrders")}
          >
            <svg
              className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">{t("profile.backToOrders")}</span>
          </button>
          
          {/* Order Items */}
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className=" rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 sm:h-32 md:h-40 bg-background-light-gray rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>

                  <div className="grid grid-cols-3 w-full gap-4 items-center">
                    {/* Product Info - Middle Section */}
                    <div className="flex-1 flex flex-col justify-center col-span-1">
                      <h3 className="text-base sm:text-lg font-semibold text-[#212844] mb-2">
                        {item.name}
                      </h3>
                      <div className="text-sm text-gray-600">
                        <span>
                          {t("cart.color")}: {item.color}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                          {t("cart.size")}: {item.size}
                        </span>
                      </div>
                    </div>
                    {/* Pricing Info - Right Section */}
                    <div className="flex flex-col justify-center gap-1 sm:gap-2 col-span-1">
                      <div className="text-sm text-gray-600">
                        {t("cart.individualPrice")}:{" "}
                        <p className="text-base font-semibold text-[#FC813B]">
                          ${item.individualPrice.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    {/* Pricing Info - Right Section */}
                    <div className="flex flex-col justify-center gap-1 sm:gap-2 col-span-1">
                      <div className="text-sm text-gray-600">
                        {t("cart.totalPrice")}:{" "}
                        <p className="text-base font-semibold text-[#FC813B]">
                          ${(item.individualPrice * item.quantity).toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
