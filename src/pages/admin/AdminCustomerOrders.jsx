import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "../../components/admin/common/DataTable";
import Pagination from "../../components/admin/common/Pagination";
import { useCustomerOrders } from "../../hooks/ordersHooks";

const AdminCustomerOrders = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id;
  const [page, setPage] = useState(1);

  const ordersQuery = useCustomerOrders({
    user_Id: userId,
    PageNumber: page,
    PageSize: 10,
  });

  const data = ordersQuery.data;
  const rows = data?.orders || [];

  const columns = useMemo(
    () => [
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
            {Number(r.total_Amount || 0).toFixed(2)}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-5">
      <button
        type="button"
        className="text-text-secondary hover:text-text-primary"
        onClick={() => navigate(-1)}
      >
        ← Customer Orders
      </button>

      {ordersQuery.isLoading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : ordersQuery.isError ? (
        <div className="text-red-600">{ordersQuery.error?.message || "Error"}</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={rows}
            keyField="order_Id"
            renderActions={(row) => (
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70"
                aria-label="View order"
                onClick={() => navigate(`/admin/orders/${row.order_Id}`)}
              >
                👁
              </button>
            )}
          />
          <Pagination
            page={data?.page_Num || page}
            pageCount={data?.page_Count || 1}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default AdminCustomerOrders;

