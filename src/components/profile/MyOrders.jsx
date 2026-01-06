import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  // Sample orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      amount: "$250.0",
    },
    {
      id: "ORD-002",
      date: "2024-01-14",
      status: "Processing",
      amount: "$180.0",
    },
    {
      id: "ORD-003",
      date: "2024-01-13",
      status: "Shipped",
      amount: "$320.0",
    },
    {
      id: "ORD-004",
      date: "2024-01-12",
      status: "Delivered",
      amount: "$150.0",
    },
    {
      id: "ORD-005",
      date: "2024-01-11",
      status: "Processing",
      amount: "$280.0",
    },
    {
      id: "ORD-006",
      date: "2024-01-10",
      status: "Shipped",
      amount: "$200.0",
    },
    {
      id: "ORD-007",
      date: "2024-01-09",
      status: "Delivered",
      amount: "$350.0",
    },
    {
      id: "ORD-008",
      date: "2024-01-08",
      status: "Processing",
      amount: "$120.0",
    },
  ];

  const getStatusTranslation = (status) => {
    const statusMap = {
      Delivered: t("profile.status.delivered"),
      Processing: t("profile.status.processing"),
      Shipped: t("profile.status.shipped"),
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Processing":
        return "text-yellow-600 bg-yellow-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
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
                {t("profile.status")}
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
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 text-sm text-gray-700 text-center">
                  {order.id}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 text-center">
                  {order.date}
                </td>
                <td className="px-4 py-4 text-sm text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusTranslation(order.status)}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-[#FC813B] text-center">
                  {order.amount}
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => navigate(`/profile/orders/${order.id}`)}
                    className="w-10 h-10 bg-[#FC813B] rounded-full flex items-center justify-center hover:bg-[#e6733a] transition-colors relative mx-auto"
                  >
                    <Eye className="w-6 h-6 text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
