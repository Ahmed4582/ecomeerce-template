import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/categoriesHooks";
import { useDeleteCategory } from "../../hooks/adminCategoriesHooks";
import DataTable from "../../components/admin/common/DataTable";
import Pagination from "../../components/admin/common/Pagination";
import ConfirmModal from "../../components/admin/common/ConfirmModal";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { resolveApiAssetUrl } from "../../utils";

const AdminCategories = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);

  const debouncedSearch = useDebouncedValue(search, 350);
  const categoriesQuery = useCategories({
    pageNumber: page,
    pageSize: 8,
    search: debouncedSearch,
  });
  const delMutation = useDeleteCategory();

  const data = categoriesQuery.data;
  const rows = data?.categories || [];

  const columns = useMemo(
    () => [
      {
        key: "category_Image",
        header: "Category Image",
        render: (r) => (
          <div className="w-10 h-10 rounded-full bg-background-primary overflow-hidden flex items-center justify-center">
            {r.category_Image ? (
              <img
                src={resolveApiAssetUrl(r.category_Image, "CateImg")}
                alt="category"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/watchimg.png";
                }}
              />
            ) : (
              <span className="text-text-secondary">—</span>
            )}
          </div>
        ),
      },
      { key: "category_Name_Ar", header: "Name In Arabic" },
      { key: "category_Name_Eng", header: "Name In English" },
    ],
    []
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-text-primary text-xl font-semibold">Categories</h1>
        <button
          type="button"
          onClick={() => navigate("/admin/categories/new")}
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

      {categoriesQuery.isLoading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : categoriesQuery.isError ? (
        <div className="text-red-600">{categoriesQuery.error?.message || "Error"}</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={rows}
            keyField="category_Id"
            renderActions={(row) => (
              <>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70"
                  aria-label="Edit category"
                  onClick={() => navigate(`/admin/categories/${row.category_Id}/edit`)}
                >
                  ✎
                </button>
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70 text-red-600"
                  aria-label="Delete category"
                  onClick={() => setPendingDelete(row)}
                >
                  🗑
                </button>
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

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        confirmText="Delete"
        onClose={() => setPendingDelete(null)}
        loading={delMutation.isPending}
        onConfirm={async () => {
          if (!pendingDelete?.category_Id) return;
          try {
            await delMutation.mutateAsync(pendingDelete.category_Id);
            setPendingDelete(null);
          } catch {
            // errors are shown by query layer / toast can be added later
          }
        }}
      />
    </div>
  );
};

export default AdminCategories;

