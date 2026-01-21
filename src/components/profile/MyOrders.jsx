import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCustomerOrders } from "../../hooks/ordersHooks";

const MyOrders = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  const ordersQuery = useCustomerOrders({
    PageNumber: 1,
    PageSize: 50,
  });

  const data = ordersQuery.data;
  const orders = data?.orders || [];

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
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Processing":
        return "text-yellow-600 bg-yellow-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      default:
        break;
    }

    switch (normalized) {
      case "delivered":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-yellow-600 bg-yellow-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-orange-700 bg-orange-100";
      case "new":
        return "text-gray-700 bg-gray-100";
      case "delivery":
        return "text-purple-700 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 min-h-[710px]">
      {/* Header */}
      <h2
        className={`text-2xl sm:text-3xl font-bold text-[#212844] mb-6 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {t("profile.orderHistory")}
      </h2>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        {ordersQuery.isLoading ? (
          <div className="text-text-secondary">
            {t("common.loading", { defaultValue: "Loading..." })}
          </div>
        ) : ordersQuery.isError ? (
          <div className="text-red-600">
            {ordersQuery.error?.message || "Error"}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-text-secondary">
            {t("profile.noOrders", { defaultValue: "No orders yet." })}
          </div>
        ) : (
        <table className="w-full text-center">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="px-4 py-3 text-sm font-semibold text-[#212844] text-center">
                {t("profile.orderId")}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-[#212844] text-center">
                {t("profile.date")}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-[#212844] text-center">
                {t("profile.statusLabel", { defaultValue: "Status" })}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-[#212844] text-center">
                {t("profile.amount")}
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-[#212844] text-center">
                {t("profile.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.order_Id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm text-gray-700 text-center">
                  #{order.order_Id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 text-center">
                  {order.order_Date ? new Date(order.order_Date).toLocaleDateString() : "—"}
                </td>
                <td className="px-4 py-4 text-sm text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-medium ${getStatusColor(
                      order.order_Status
                    )}`}
                  >
                    {getStatusTranslation(order.order_Status)}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-[#FC813B] text-center">
                  {typeof order.total_Amount === "number"
                    ? order.total_Amount.toFixed(2)
                    : Number(order.total_Amount || 0).toFixed(2)}
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => navigate(`/profile/orders/${order.order_Id}`)}
                    className="w-10 h-10 bg-[#FC813B] rounded-full flex items-center justify-center hover:bg-[#e6733a] transition-colors relative mx-auto"
                  >
                    <Eye className="w-6 h-6 text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
