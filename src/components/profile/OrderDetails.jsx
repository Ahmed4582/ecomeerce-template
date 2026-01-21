import { useTranslation } from "react-i18next";
import CheckoutSidebar from "./CheckoutSidebar";
import { useNavigate } from "react-router-dom";
import { useOrderDetails } from "../../hooks/ordersHooks";
import { resolveApiAssetUrl } from "../../utils";

const OrderDetails = ({ orderId }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  const parsedOrderId =
    orderId != null && orderId !== "" && !Number.isNaN(Number(orderId))
      ? Number(orderId)
      : orderId;

  const detailsQuery = useOrderDetails(parsedOrderId);
  const data = detailsQuery.data;
  const items = data?.order_Items || [];

  const parseNotes = (notes) => {
    const out = {};
    String(notes || "")
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((pair) => {
        const idx = pair.indexOf(":");
        if (idx === -1) return;
        const k = pair.slice(0, idx).trim();
        const v = pair.slice(idx + 1).trim();
        if (!k) return;
        out[k] = v;
      });
    return out;
  };

  const getStatusTranslation = (status) => {
    const normalized = String(status || "").toLowerCase();
    const statusMap = {
      delivered: t("profile.status.delivered", { defaultValue: "Delivered" }),
      processing: t("profile.status.processing", { defaultValue: "Processing" }),
      shipped: t("profile.status.shipped", { defaultValue: "Shipped" }),
      pending: t("profile.status.pending", { defaultValue: "Pending" }),
      new: t("profile.status.new", { defaultValue: "New" }),
      delivery: t("profile.status.delivery", { defaultValue: "Delivery" }),
    };
    return statusMap[normalized] || status || "—";
  };

  const getStatusColor = (status) => {
    const normalized = String(status || "").toLowerCase();
    switch (normalized) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-yellow-600 bg-yellow-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-orange-700 bg-orange-100";
      case "delivery":
        return "text-purple-700 bg-purple-100";
      case "new":
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const getItemName = (item) => {
    if (i18n.language === "ar") {
      return item.product_Name_Ar || item.product_Name_En || "—";
    }
    return item.product_Name_En || item.product_Name_Ar || "—";
  };

  const getItemSize = (item) => {
    const attrs = item.attributes_Values || [];
    const size = attrs.find((a) => String(a.value || "").includes("x"))?.value;
    return size || "—";
  };

  const getItemColor = (item) => {
    const attrs = item.attributes_Values || [];
    const color = attrs.find((a) => !String(a.value || "").includes("x"))?.value;
    return color || "—";
  };

  const getItemPrice = (item) => {
    const candidates = [
      item.individualPrice,
      item.unit_Price,
      item.unitPrice,
      item.price,
      item.product_Price,
      item.productPrice,
    ];
    const found = candidates.find((v) => typeof v === "number" || typeof v === "string");
    const n = Number(found);
    return Number.isFinite(n) ? n : null;
  };

  const getItemImageSrc = (item) => {
    const raw =
      item.image || item.product_Image || item.imageUrl || item.base_Image || "";
    return resolveApiAssetUrl(raw, "ProdImg") || "/images/watchimg.png";
  };

  const computedSubtotal = items.reduce((sum, item) => {
    const price = getItemPrice(item);
    const qty = Number(item.quantity || 0);
    if (!Number.isFinite(qty)) return sum;
    if (price == null) return sum;
    return sum + price * qty;
  }, 0);

  const totalFromApi = Number(data?.total_Amount ?? data?.totalAmount ?? 0);
  const shippingFromApi = Number(data?.shipping_Cost ?? data?.shippingCost ?? 0);
  const total = Number.isFinite(totalFromApi) && totalFromApi > 0 ? totalFromApi : computedSubtotal;
  const shipping = Number.isFinite(shippingFromApi) ? shippingFromApi : 0;
  const subtotal = computedSubtotal > 0 ? computedSubtotal : Math.max(total - shipping, 0);
  const couponDiscount = 0;
  const discountAmount = 0;

  const meta = data || {};
  const notes = parseNotes(meta.notes);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left Sidebar */}
      <div
        className={`lg:col-span-3 ${isRTL ? "order-2 lg:order-1" : "order-1"}`}
      >
        <CheckoutSidebar
          subtotal={Number(subtotal || 0)}
          couponDiscount={Number(couponDiscount || 0)}
          discountAmount={Number(discountAmount || 0)}
          shipping={Number(shipping || 0)}
          total={Number(total || 0)}
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

          {detailsQuery.isLoading ? (
            <div className="text-text-secondary">
              {t("common.loading", { defaultValue: "Loading..." })}
            </div>
          ) : detailsQuery.isError ? (
            <div className="text-red-600">
              {detailsQuery.error?.message || "Error"}
            </div>
          ) : (
          <>
            {/* Order meta card (like your design) */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white mb-6">
              <div className="px-6 py-5 sm:px-7 sm:py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">{t("profile.orderId")}</span>
                    <span className="font-semibold text-[#212844]">
                      #{meta.order_Id ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">{t("profile.date")}</span>
                    <span className="font-semibold text-[#212844]">
                      {meta.order_Date ? new Date(meta.order_Date).toLocaleString() : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">
                      {t("profile.statusLabel", { defaultValue: "Status" })}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full font-medium ${getStatusColor(
                        meta.order_Status
                      )}`}
                    >
                      {getStatusTranslation(meta.order_Status)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">
                      {t("cart.address", { defaultValue: "Address" })}
                    </span>
                    <span className="font-semibold text-[#212844]">
                      {meta.shipping_Address || meta.address || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">
                      {t("profile.email", { defaultValue: "Email" })}
                    </span>
                    <span className="font-semibold text-[#212844]">
                      {meta.email || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">
                      {t("cart.phone", { defaultValue: "Phone Number" })}
                    </span>
                    <span className="font-semibold text-[#212844]">
                      {meta.phone_Number || notes.phone || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">
                      {t("cart.selectPaymentMethod", {
                        defaultValue: "Select Payment Method",
                      })}
                    </span>
                    <span className="font-semibold text-[#212844]">
                      {notes.payment || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-gray-600">
                      {t("cart.couponApply", { defaultValue: "Coupon Apply" })}
                    </span>
                    <span className="font-semibold text-[#212844]">
                      {notes.coupon || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            {items.length === 0 ? (
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <div className="px-6 py-10 sm:px-7 text-text-secondary">
                  {t("profile.noOrderItems", { defaultValue: "No items in this order." })}
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white divide-y divide-gray-200">
                {items.map((item) => {
                  const price = getItemPrice(item);
                  const qty = Number(item.quantity || 0);
                  const totalLine =
                    price != null && Number.isFinite(qty) ? price * qty : null;

                  return (
                    <div
                      key={
                        item.variant_Id ||
                        item.product_Id ||
                        item.id ||
                        `${item.product_Name_En}-${item.quantity}`
                      }
                      className="px-6 py-5 sm:px-7 sm:py-6"
                    >
                      <div className="flex items-start gap-5 sm:gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-background-light-gray rounded-xl flex items-center justify-center overflow-hidden">
                          <img
                            src={getItemImageSrc(item)}
                            alt={getItemName(item)}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = "/images/watchimg.png";
                            }}
                          />
                        </div>

                        {/* Middle: Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-[#212844] leading-snug">
                            {getItemName(item)}
                          </h3>
                          <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <div>
                              {t("cart.color")}: {getItemColor(item)}
                            </div>
                            <div>
                              {t("cart.size")}: {getItemSize(item)}
                            </div>
                          </div>
                        </div>

                        {/* Right: Prices (two fixed columns like design) */}
                        <div className="grid grid-cols-2 gap-10 sm:gap-12 flex-shrink-0">
                          <div className="w-[130px]">
                            <div className="text-xs sm:text-sm text-gray-500">
                              {t("cart.individualPrice")}
                            </div>
                            <div className="mt-1 text-base font-semibold text-[#FC813B]">
                              {price == null ? "—" : `$${price.toFixed(2)}`}
                            </div>
                          </div>
                          <div className="w-[130px]">
                            <div className="text-xs sm:text-sm text-gray-500">
                              {t("cart.totalPrice")}
                            </div>
                            <div className="mt-1 text-base font-semibold text-[#FC813B]">
                              {totalLine == null ? "—" : `$${totalLine.toFixed(2)}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
