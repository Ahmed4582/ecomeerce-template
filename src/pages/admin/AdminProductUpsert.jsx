import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../hooks/categoriesHooks";
import { useAttributes } from "../../hooks/attributesHooks";
import { useProduct } from "../../hooks/productsHooks";
import { useCreateProduct, useUpdateProduct } from "../../hooks/adminProductsHooks";

const AdminProductUpsert = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const productId = Number(id);

  const categoriesQuery = useCategories({ pageNumber: 1, pageSize: 100, search: "" });
  const attributesQuery = useAttributes();
  const productQuery = useProduct(isEdit ? productId : null);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const categories = categoriesQuery.data?.categories || [];
  const attributes = attributesQuery.data || [];

  const [form, setForm] = useState({
    product_Name_Ar: "",
    product_Name_En: "",
    description_Ar: "",
    description_En: "",
    product_Code: "",
    basic_Price: "",
    basic_stock_Quantity: "",
    category_Id: "",
  });
  const [attributeIds, setAttributeIds] = useState([]);
  const [variantsJson, setVariantsJson] = useState("[]");
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!isEdit) return;
    const p = productQuery.data;
    if (!p) return;
    setForm({
      product_Name_Ar: p.product_Name_Ar || "",
      product_Name_En: p.product_Name_En || "",
      description_Ar: p.description_Ar || "",
      description_En: p.description_En || "",
      product_Code: p.product_Code || "",
      basic_Price: String(p.basic_Price ?? ""),
      basic_stock_Quantity: String(p.basic_stock_Quantity ?? ""),
      category_Id: String(p.category_Id ?? ""),
    });
    const ids = (p.attributes || []).map((a) => a.attribute_Id).filter(Boolean);
    setAttributeIds(ids);
    setVariantsJson(JSON.stringify(p.variants || [], null, 2));
  }, [isEdit, productQuery.data]);

  const title = useMemo(
    () => (isEdit ? "Edit Product" : "Add Product"),
    [isEdit]
  );

  const onToggleAttr = (attrId) => {
    setAttributeIds((prev) =>
      prev.includes(attrId) ? prev.filter((x) => x !== attrId) : [...prev, attrId]
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let variants = [];
    try {
      variants = JSON.parse(variantsJson || "[]");
      if (!Array.isArray(variants)) variants = [];
    } catch {
      variants = [];
    }

    const base_Information = {
      ...(isEdit ? { product_Id: productId } : {}),
      product_Name_Ar: form.product_Name_Ar,
      product_Name_En: form.product_Name_En,
      description_Ar: form.description_Ar,
      description_En: form.description_En,
      product_Code: form.product_Code,
      basic_Price: Number(form.basic_Price || 0),
      basic_stock_Quantity: Number(form.basic_stock_Quantity || 0),
      category_Id: Number(form.category_Id || 0),
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          base_Information,
          variants,
          images,
          existing_Images: "",
        });
      } else {
        await createMutation.mutateAsync({
          base_Information,
          variants,
          attribute_Ids: attributeIds,
          images,
          cover_Image: cover,
        });
      }
      navigate("/admin/products");
    } catch {
      // error shown below
    }
  };

  const loading =
    categoriesQuery.isLoading ||
    attributesQuery.isLoading ||
    (isEdit && productQuery.isLoading) ||
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

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="bg-background-white rounded-2xl shadow-card p-6 space-y-5">
          <h2 className="text-text-primary font-semibold">Basic Product Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Product Name (Arabic)
              </label>
              <input
                value={form.product_Name_Ar}
                onChange={(e) => setForm((p) => ({ ...p, product_Name_Ar: e.target.value }))}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Product Name (English)
              </label>
              <input
                value={form.product_Name_En}
                onChange={(e) => setForm((p) => ({ ...p, product_Name_En: e.target.value }))}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Code</label>
              <input
                value={form.product_Code}
                onChange={(e) => setForm((p) => ({ ...p, product_Code: e.target.value }))}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Category</label>
              <select
                value={form.category_Id}
                onChange={(e) => setForm((p) => ({ ...p, category_Id: e.target.value }))}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((c) => (
                  <option key={c.category_Id} value={c.category_Id}>
                    {c.category_Name_Eng || c.category_Name_Ar}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-2">Basic Price</label>
              <input
                type="number"
                value={form.basic_Price}
                onChange={(e) => setForm((p) => ({ ...p, basic_Price: e.target.value }))}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Basic Stock Quantity
              </label>
              <input
                type="number"
                value={form.basic_stock_Quantity}
                onChange={(e) =>
                  setForm((p) => ({ ...p, basic_stock_Quantity: e.target.value }))
                }
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Description (Arabic)
              </label>
              <textarea
                value={form.description_Ar}
                onChange={(e) => setForm((p) => ({ ...p, description_Ar: e.target.value }))}
                rows={4}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                Description (English)
              </label>
              <textarea
                value={form.description_En}
                onChange={(e) => setForm((p) => ({ ...p, description_En: e.target.value }))}
                rows={4}
                className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>
        </div>

        <div className="bg-background-white rounded-2xl shadow-card p-6 space-y-5">
          <h2 className="text-text-primary font-semibold">Sizes, Colors And Quantities</h2>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Attributes</label>
            <div className="flex flex-wrap gap-2">
              {(attributes || []).map((a) => (
                <label
                  key={a.attribute_Id}
                  className="flex items-center gap-2 bg-background-primary border border-border-light rounded-full px-4 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={attributeIds.includes(a.attribute_Id)}
                    onChange={() => onToggleAttr(a.attribute_Id)}
                  />
                  <span>{a.attribute_Name_En || a.attribute_Name_Ar}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Variants JSON (from Swagger)
            </label>
            <textarea
              value={variantsJson}
              onChange={(e) => setVariantsJson(e.target.value)}
              rows={8}
              className="w-full font-mono bg-background-primary border border-border-light rounded-lg px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <p className="text-xs text-text-secondary mt-2">
              Note: This follows the backend variant structure. We can replace this UI later
              with the exact multi-size/multi-color UI from your screenshots.
            </p>
          </div>
        </div>

        <div className="bg-background-white rounded-2xl shadow-card p-6 space-y-4">
          <h2 className="text-text-primary font-semibold">Images</h2>

          {!isEdit && (
            <div>
              <label className="block text-sm text-text-secondary mb-2">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCover(e.target.files?.[0] || null)}
                className="w-full text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-text-secondary mb-2">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files || []))}
              className="w-full text-sm"
            />
          </div>
        </div>

        {(createMutation.isError || updateMutation.isError) && (
          <div className="text-red-600 text-sm">
            {(createMutation.error?.message || updateMutation.error?.message) ?? "Error"}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {loading ? "Loading..." : title}
        </button>
      </form>
    </div>
  );
};

export default AdminProductUpsert;

