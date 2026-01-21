import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/admin/common/DataTable";
import Pagination from "../../components/admin/common/Pagination";
import { useOrders, useUpdateOrderStatus } from "../../hooks/ordersHooks";
import useDebouncedValue from "../../hooks/useDebouncedValue";

const STATUS_OPTIONS = ["New", "Delivery", "Delivered"];

const AdminOrders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(search, 350);
  const ordersQuery = useOrders({
    PageNumber: page,
    PageSize: 10,
    search_Value: debouncedSearch,
  });
  const updateStatus = useUpdateOrderStatus();

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
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-text-primary text-xl font-semibold">Orders</h1>
      </div>

      <div className="bg-background-white rounded-2xl shadow-card p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 relative">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="w-full bg-background-primary border border-border-light rounded-full px-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
              🔎
            </span>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-background-primary border border-border-light text-sm"
            >
              Filters
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-background-primary border border-border-light text-sm"
            >
              Export
            </button>
          </div>
        </div>
      </div>

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
              <>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70"
                  aria-label="View order"
                  onClick={() => navigate(`/admin/orders/${row.order_Id}`)}
                >
                  👁
                </button>
                <select
                  className="bg-background-primary border border-border-light rounded-lg px-3 py-2 text-sm"
                  value={row.order_Status || ""}
                  onChange={async (e) => {
                    const Status = e.target.value;
                    try {
                      await updateStatus.mutateAsync({
                        orderid: row.order_Id,
                        Status,
                      });
                    } catch {
                      // ignore
                    }
                  }}
                  aria-label="Change order status"
                  disabled={updateStatus.isPending}
                >
                  <option value="" disabled>
                    Status
                  </option>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </>
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

export default AdminOrders;

