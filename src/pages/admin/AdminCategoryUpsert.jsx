import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../hooks/categoriesHooks";
import { useCreateCategory, useUpdateCategory } from "../../hooks/adminCategoriesHooks";
import { resolveApiAssetUrl } from "../../utils";

const AdminCategoryUpsert = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const isEdit = !!id;

  const categoryQuery = useCategory(id);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const previewSrc = useMemo(() => resolveApiAssetUrl(preview, "CateImg"), [preview]);

  const category = categoryQuery.data;

  useEffect(() => {
    if (!isEdit) return;
    if (!category) return;
    setNameAr(category.category_Name_Ar || "");
    setNameEn(category.category_Name_Eng || "");
    setPreview(category.category_Image || "");
  }, [isEdit, category]);

  const title = useMemo(() => (isEdit ? "Edit Category" : "Add A New Category"), [isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      category_Id: isEdit ? Number(id) : 0,
      category_Name_Ar: nameAr,
      category_Name_Eng: nameEn,
      upload: file || undefined,
    };

    try {
      if (isEdit) await updateMutation.mutateAsync(payload);
      else await createMutation.mutateAsync(payload);
      navigate("/admin/categories");
    } catch {
      // handled by mutation error
    }
  };

  const loading =
    (isEdit && categoryQuery.isLoading) ||
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <div className="space-y-5">
      <button
        type="button"
        className="text-text-secondary hover:text-text-primary"
        onClick={() => navigate(-1)}
      >
        ← {title}
      </button>

      <div className="bg-background-white rounded-2xl shadow-card p-6">
        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1">
            <div className="w-full aspect-[4/3] rounded-2xl bg-background-primary border border-border-light overflow-hidden flex items-center justify-center">
              {preview ? (
                <img
                  src={previewSrc}
                  alt="preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/watchimg.png";
                  }}
                />
              ) : (
                <div className="text-center text-text-secondary">
                  <div className="text-3xl mb-2">🖼</div>
                  <div className="text-sm">Category Image</div>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="mt-3 w-full text-sm"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setFile(f);
                setPreview(f ? URL.createObjectURL(f) : preview);
              }}
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Name in Arabic</label>
                <input
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="Name in Arabic"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Name in English</label>
                <input
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="Name in English"
                  required
                />
              </div>
            </div>

            {(createMutation.isError || updateMutation.isError) && (
              <div className="text-red-600 text-sm">
                {(createMutation.error?.message || updateMutation.error?.message) ?? "Error"}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-primary hover:bg-brand-primary-hover text-white px-10 py-3 rounded-lg font-semibold disabled:opacity-60"
              >
                {loading ? "Loading..." : isEdit ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategoryUpsert;

