import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/admin/common/DataTable";
import Pagination from "../../components/admin/common/Pagination";
import ConfirmModal from "../../components/admin/common/ConfirmModal";
import { useProducts } from "../../hooks/productsHooks";
import { useDeleteProduct } from "../../hooks/adminProductsHooks";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import {
  Download,
  Eye,
  Percent,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 350);
  const productsQuery = useProducts({
    PageNumber: page,
    PageSize: 10,
    search_Value: debouncedSearch,
  });

  const delMutation = useDeleteProduct();

  const data = productsQuery.data;
  const rows = data?.products || [];

  const columns = useMemo(
    () => [
      { key: "product_Name_Ar", header: "Name In Arabic" },
      { key: "product_Name_En", header: "Name In English" },
      {
        key: "basic_Price",
        header: "Price",
        render: (r) => (
          <span className="text-brand-primary font-semibold">
            {Number(r.basic_Price || 0).toFixed(2)}
          </span>
        ),
      },
      {
        key: "basic_stock_Quantity",
        header: "Available Quantity",
        render: (r) => (
          <span className="text-brand-primary font-semibold">
            {Number(r.basic_stock_Quantity || 0)}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-text-primary text-xl font-semibold">Products</h1>
        <button
          type="button"
          onClick={() => navigate("/admin/products/new")}
          className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2.5 rounded-full font-semibold inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      <div className="bg-background-white rounded-2xl shadow-card p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="w-full bg-background-primary border border-border-light rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-background-primary border border-border-light text-sm inline-flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-background-primary border border-border-light text-sm inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {productsQuery.isLoading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : productsQuery.isError ? (
        <div className="text-red-600">{productsQuery.error?.message || "Error"}</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={rows}
            keyField="product_Id"
            renderActions={(row) => {
              return (
                <>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-[#EAF7EF] text-[#1F9D55] hover:bg-[#DFF3E7] flex items-center justify-center"
                    aria-label="View product"
                    onClick={() => navigate(`/admin/products/${row.product_Id}`)}
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-[#EAF7EF] text-[#1F9D55] hover:bg-[#DFF3E7] flex items-center justify-center"
                    aria-label="Discount"
                    title="Discount"
                    onClick={() =>
                      navigate(`/admin/products/${row.product_Id}`, {
                        state: { openDiscount: true },
                      })
                    }
                  >
                    <Percent className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70 flex items-center justify-center"
                    aria-label="Edit product"
                    onClick={() => navigate(`/admin/products/${row.product_Id}/edit`)}
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center"
                    aria-label="Delete product"
                    onClick={() => setPendingDelete(row)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              );
            }}
          />
          <Pagination
            page={data?.page_Num || page}
            pageCount={data?.page_Count || 1}
            onChange={setPage}
          />
        </>
      )}

      <ConfirmModal
        open={!!pendingDelete}
        title="Are You Sure You Want To Delete This Product?"
        message={null}
        confirmText="Delete"
        cancelText="Back"
        layout="stacked"
        showIcon
        onClose={() => setPendingDelete(null)}
        loading={delMutation.isPending}
        onConfirm={async () => {
          if (!pendingDelete?.product_Id) return;
          try {
            await delMutation.mutateAsync(pendingDelete.product_Id);
            setPendingDelete(null);
            setSuccessOpen(true);
          } catch {
            // ignore
          }
        }}
      />

      {successOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/35"
            aria-label="Close"
            onClick={() => setSuccessOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-card p-6 sm:p-8 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-[#FC813B]/10 flex items-center justify-center">
              <span className="text-[#FC813B] text-3xl font-bold">✓</span>
            </div>
            <p className="mt-4 text-sm sm:text-base md:text-lg font-normal text-[#212844]">
              The modification process was completed successfully
            </p>
            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="mt-6 w-full bg-[#FC813B] hover:bg-[#e6733a] text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

