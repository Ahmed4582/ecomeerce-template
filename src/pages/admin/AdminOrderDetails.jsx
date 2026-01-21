import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "../../components/admin/common/DataTable";
import { useOrderDetails, useUpdateOrderStatus } from "../../hooks/ordersHooks";

const STATUS_OPTIONS = ["New", "Delivery", "Delivered"];

const AdminOrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = Number(id);

  const detailsQuery = useOrderDetails(orderId);
  const updateStatus = useUpdateOrderStatus();
  const [status, setStatus] = useState("");

  const data = detailsQuery.data;
  const items = data?.order_Items || [];

  const columns = useMemo(
    () => [
      { key: "product_Name_En", header: "Product Name" },
      {
        key: "requiredSize",
        header: "Required Size",
        render: (r) => {
          const attrs = r.attributes_Values || [];
          const size = attrs.find((a) => String(a.value || "").includes("x"))?.value;
          return size || "—";
        },
      },
      {
        key: "requiredColor",
        header: "Required Color",
        render: (r) => {
          const attrs = r.attributes_Values || [];
          const color = attrs.find((a) => !String(a.value || "").includes("x"))?.value;
          return color || "—";
        },
      },
      {
        key: "quantity",
        header: "Required Quantity",
        render: (r) => (
          <span className="text-brand-primary font-semibold">
            {Number(r.quantity || 0)}
          </span>
        ),
      },
    ],
    []
  );

  if (detailsQuery.isLoading) return <div className="text-text-secondary">Loading...</div>;
  if (detailsQuery.isError)
    return <div className="text-red-600">{detailsQuery.error?.message || "Error"}</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="text-text-secondary hover:text-text-primary"
          onClick={() => navigate(-1)}
        >
          ← Order Details
        </button>

        <select
          className="bg-background-white border border-border-light rounded-lg px-3 py-2 text-sm shadow-card"
          value={status || data?.order_Status || ""}
          onChange={async (e) => {
            const next = e.target.value;
            setStatus(next);
            try {
              await updateStatus.mutateAsync({ orderid: orderId, Status: next });
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
      </div>

      <DataTable columns={columns} rows={items} keyField="variant_Id" />
    </div>
  );
};

export default AdminOrderDetails;

