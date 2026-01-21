import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/admin/common/DataTable";
import Pagination from "../../components/admin/common/Pagination";
import ConfirmModal from "../../components/admin/common/ConfirmModal";
import { useProducts } from "../../hooks/productsHooks";
import { useBlockProduct, useDeleteProduct, useUnBlockProduct } from "../../hooks/adminProductsHooks";
import useDebouncedValue from "../../hooks/useDebouncedValue";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);

  const debouncedSearch = useDebouncedValue(search, 350);
  const productsQuery = useProducts({
    PageNumber: page,
    PageSize: 10,
    search_Value: debouncedSearch,
  });

  const delMutation = useDeleteProduct();
  const blockMutation = useBlockProduct();
  const unBlockMutation = useUnBlockProduct();

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
          className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2.5 rounded-full font-semibold"
        >
          Add
        </button>
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
              const isBlocked = !!row.is_Block;
              const isBusy = blockMutation.isPending || unBlockMutation.isPending;
              return (
                <>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70"
                    aria-label="View product"
                    onClick={() => navigate(`/admin/products/${row.product_Id}`)}
                  >
                    👁
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70"
                    aria-label={isBlocked ? "Unblock product" : "Block product"}
                    onClick={async () => {
                      try {
                        if (isBlocked) await unBlockMutation.mutateAsync(row.product_Id);
                        else await blockMutation.mutateAsync(row.product_Id);
                      } catch {
                        // ignore
                      }
                    }}
                    title={isBlocked ? "Unblock" : "Block"}
                  >
                    🚫
                  </button>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70"
                    aria-label="Edit product"
                    onClick={() => navigate(`/admin/products/${row.product_Id}/edit`)}
                  >
                    ✎
                  </button>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70 text-red-600"
                    aria-label="Delete product"
                    onClick={() => setPendingDelete(row)}
                  >
                    🗑
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
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        confirmText="Delete"
        onClose={() => setPendingDelete(null)}
        loading={delMutation.isPending}
        onConfirm={async () => {
          if (!pendingDelete?.product_Id) return;
          try {
            await delMutation.mutateAsync(pendingDelete.product_Id);
            setPendingDelete(null);
          } catch {
            // ignore
          }
        }}
      />
    </div>
  );
};

export default AdminProducts;

