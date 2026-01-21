import { useMemo, useState } from "react";
import { useProducts } from "../../hooks/productsHooks";
import { useOrders } from "../../hooks/ordersHooks";
import DataTable from "../../components/admin/common/DataTable";
import Pagination from "../../components/admin/common/Pagination";
import { useNavigate } from "react-router-dom";

const StatCard = ({ icon, value, label }) => (
  <div className="bg-background-white rounded-2xl shadow-card p-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-background-primary flex items-center justify-center">
      <span className="text-xl">{icon}</span>
    </div>
    <div>
      <div className="text-text-primary text-lg font-bold">{value}</div>
      <div className="text-text-secondary text-sm">{label}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [ordersPage, setOrdersPage] = useState(1);

  const productsQuery = useProducts({ PageNumber: 1, PageSize: 100 });
  const ordersQuery = useOrders({ PageNumber: ordersPage, PageSize: 10 });

  const productsData = productsQuery.data;
  const ordersData = ordersQuery.data;

  const products = useMemo(() => productsData?.products || [], [productsData]);
  const productsCount = productsData?.products_Count ?? products.length ?? 0;

  const orders = ordersData?.orders || [];
  const ordersCount = ordersData?.orders_Count ?? orders.length ?? 0;

  const missingQuantity = useMemo(() => {
    // best-effort: count products with zero stock
    return products.filter((p) => Number(p.basic_stock_Quantity || 0) <= 0).length;
  }, [products]);

  const columns = [
    {
      key: "order_Id",
      header: "Order ID",
      render: (r) => (
        <span className="text-brand-primary font-semibold">#{r.order_Id}</span>
      ),
    },
    {
      key: "order_Date",
      header: "Order Date",
      render: (r) =>
        r.order_Date ? new Date(r.order_Date).toLocaleDateString() : "—",
    },
    { key: "order_Status", header: "Order Status" },
    {
      key: "total_Amount",
      header: "Order Cost",
      render: (r) => (
        <span className="text-brand-primary font-semibold">
          {typeof r.total_Amount === "number"
            ? r.total_Amount.toFixed(2)
            : Number(r.total_Amount || 0).toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-text-primary text-xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard icon="📦" value={ordersCount} label="Number of Orders" />
        <StatCard icon="🧺" value={productsCount} label="Number of products" />
        <StatCard icon="🧯" value={missingQuantity} label="missing quantity" />
      </div>

      <div className="space-y-3">
        <h2 className="text-text-primary font-semibold">Latest Orders</h2>

        {ordersQuery.isLoading ? (
          <div className="text-text-secondary">Loading...</div>
        ) : ordersQuery.isError ? (
          <div className="text-red-600">{ordersQuery.error?.message || "Error"}</div>
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={orders}
              keyField="order_Id"
              renderActions={(row) => (
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
                  aria-label="View order"
                  onClick={() => navigate(`/admin/orders/${row.order_Id}`)}
                >
                  👁
                </button>
              )}
            />
            <Pagination
              page={ordersData?.page_Num || ordersPage}
              pageCount={ordersData?.page_Count || 1}
              onChange={setOrdersPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

