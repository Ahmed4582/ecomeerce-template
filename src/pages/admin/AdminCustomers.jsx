import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/admin/common/DataTable";
import Pagination from "../../components/admin/common/Pagination";
import { useUsers } from "../../hooks/usersHooks";
import useDebouncedValue from "../../hooks/useDebouncedValue";

const AdminCustomers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(search, 350);
  const usersQuery = useUsers({
    PageNumber: page,
    PageSize: 10,
    search_Value: debouncedSearch,
  });

  const data = usersQuery.data;
  const rows = data?.users || [];

  const columns = useMemo(
    () => [
      { key: "user_Name", header: "Full Name" },
      { key: "email", header: "Email Adress" },
      { key: "phone_Number", header: "Mobile Number" },
      {
        key: "number_Of_Orders",
        header: "Number Of Orders",
        render: (r) => (
          <span className="text-brand-primary font-semibold">
            {Number(r.number_Of_Orders || 0)}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-text-primary text-xl font-semibold">Customers</h1>
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

      {usersQuery.isLoading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : usersQuery.isError ? (
        <div className="text-red-600">{usersQuery.error?.message || "Error"}</div>
      ) : (
        <>
          <DataTable
            columns={columns}
            rows={rows}
            keyField="user_Id"
            renderActions={(row) => (
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70"
                aria-label="View customer orders"
                onClick={() => navigate(`/admin/customers/${row.user_Id}/orders`)}
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

export default AdminCustomers;

