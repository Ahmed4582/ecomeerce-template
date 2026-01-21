import { useMemo, useState } from "react";
import DataTable from "../../components/admin/common/DataTable";
import ConfirmModal from "../../components/admin/common/ConfirmModal";
import Modal from "../../components/admin/common/Modal";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import {
  useAttributes,
  useCreateAttribute,
  useDeleteAttribute,
  useUpdateAttribute,
} from "../../hooks/attributesHooks";

const AdminAttributes = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);

  const listQuery = useAttributes();
  const createMutation = useCreateAttribute();
  const updateMutation = useUpdateAttribute();
  const deleteMutation = useDeleteAttribute();

  const [openUpsert, setOpenUpsert] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");

  const rows = useMemo(() => {
    const all = listQuery.data || [];
    const q = String(debouncedSearch || "").trim().toLowerCase();
    if (!q) return all;
    return all.filter((a) => {
      const ar = String(a.attribute_Name_Ar || "").toLowerCase();
      const en = String(a.attribute_Name_En || "").toLowerCase();
      return ar.includes(q) || en.includes(q);
    });
  }, [listQuery.data, debouncedSearch]);

  const columns = useMemo(
    () => [
      { key: "attribute_Id", header: "ID" },
      { key: "attribute_Name_Ar", header: "Name In Arabic" },
      { key: "attribute_Name_En", header: "Name In English" },
    ],
    []
  );

  const openCreate = () => {
    setEditing(null);
    setNameAr("");
    setNameEn("");
    setOpenUpsert(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setNameAr(row.attribute_Name_Ar || "");
    setNameEn(row.attribute_Name_En || "");
    setOpenUpsert(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      attribute_Id: editing?.attribute_Id || 0,
      attribute_Name_Ar: nameAr,
      attribute_Name_En: nameEn,
    };
    try {
      if (editing) await updateMutation.mutateAsync(payload);
      else await createMutation.mutateAsync(payload);
      setOpenUpsert(false);
      setEditing(null);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-text-primary text-xl font-semibold">Attributes</h1>
        <button
          type="button"
          onClick={openCreate}
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-background-primary border border-border-light rounded-full px-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
              🔎
            </span>
          </div>
        </div>
      </div>

      {listQuery.isLoading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : listQuery.isError ? (
        <div className="text-red-600">{listQuery.error?.message || "Error"}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          keyField="attribute_Id"
          renderActions={(row) => (
            <>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70"
                aria-label="Edit attribute"
                onClick={() => openEdit(row)}
              >
                ✎
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70 text-red-600"
                aria-label="Delete attribute"
                onClick={() => setPendingDelete(row)}
              >
                🗑
              </button>
            </>
          )}
        />
      )}

      <Modal
        open={openUpsert}
        title={editing ? "Edit Attribute" : "Add Attribute"}
        onClose={() => setOpenUpsert(false)}
        maxWidthClass="max-w-xl"
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Name in Arabic
              </label>
              <input
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Name in English
              </label>
              <input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>
          </div>

          {(createMutation.isError || updateMutation.isError) && (
            <div className="text-red-600 text-sm">
              {(createMutation.error?.message || updateMutation.error?.message) ??
                "Error"}
            </div>
          )}

          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {createMutation.isPending || updateMutation.isPending
              ? "Loading..."
              : "Save"}
          </button>
        </form>
      </Modal>

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete Attribute"
        message="Are you sure you want to delete this attribute?"
        confirmText="Delete"
        onClose={() => setPendingDelete(null)}
        loading={deleteMutation.isPending}
        onConfirm={async () => {
          if (!pendingDelete?.attribute_Id) return;
          try {
            await deleteMutation.mutateAsync(pendingDelete.attribute_Id);
            setPendingDelete(null);
          } catch {
            // ignore
          }
        }}
      />
    </div>
  );
};

export default AdminAttributes;

