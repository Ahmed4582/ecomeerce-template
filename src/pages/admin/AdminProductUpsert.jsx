import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../hooks/categoriesHooks";
import { useAttributes } from "../../hooks/attributesHooks";
import { useProduct } from "../../hooks/productsHooks";
import { useCreateProduct, useUpdateProduct } from "../../hooks/adminProductsHooks";
import DataTable from "../../components/admin/common/DataTable";
import ConfirmModal from "../../components/admin/common/ConfirmModal";
import { ImagePlus, X, ArrowLeft, Check } from "lucide-react";

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
  const attributes = useMemo(
    () => attributesQuery.data || [],
    [attributesQuery.data]
  );

  const [step, setStep] = useState(1); // 1: Basic info, 2: Sizes/colors/quantities

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

  // Images (new uploads)
  const [cover, setCover] = useState(null);
  const [images, setImages] = useState([]);
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  // UI state for sizes/colors
  const [multipleSizes, setMultipleSizes] = useState(true);
  const [multipleColors, setMultipleColors] = useState(true);
  const [oneSizeAndColor, setOneSizeAndColor] = useState(false);

  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");
  const [sizes, setSizes] = useState([]); // [{ size, quantity }]

  const [confirmRemoveSize, setConfirmRemoveSize] = useState(null);
  const [confirmRemoveColor, setConfirmRemoveColor] = useState(null);

  // Derived helpers
  const sizeAttrId = useMemo(() => {
    const list = Array.isArray(attributes) ? attributes : [];
    const hit = list.find((a) => {
      const en = String(a.attribute_Name_En || "").toLowerCase();
      const ar = String(a.attribute_Name_Ar || "").toLowerCase();
      return en === "size" || ar === "المقاس" || ar === "الحجم";
    });
    return hit?.attribute_Id ?? null;
  }, [attributes]);

  const colorAttrId = useMemo(() => {
    const list = Array.isArray(attributes) ? attributes : [];
    const hit = list.find((a) => {
      const en = String(a.attribute_Name_En || "").toLowerCase();
      const ar = String(a.attribute_Name_Ar || "").toLowerCase();
      return en === "color" || ar === "اللون";
    });
    return hit?.attribute_Id ?? null;
  }, [attributes]);

  const buildVariantsFromUi = useMemo(() => {
    const basePrice = Number(form.basic_Price || 0);

    const pickedSizes =
      oneSizeAndColor
        ? sizes.slice(0, 1)
        : multipleSizes
          ? sizes
          : sizes.slice(0, 1);

    const pickedColors =
      oneSizeAndColor
        ? colors.slice(0, 1)
        : multipleColors
          ? colors
          : colors.slice(0, 1);

    // Build a variant per size/color combination (backend-friendly)
    const out = [];
    for (const s of pickedSizes) {
      for (const c of (pickedColors.length ? pickedColors : [""])) {
        const qty = Number(s.quantity || 0);
        const attrsArr = [];
        if (sizeAttrId) {
          attrsArr.push({
            attribute_Id: sizeAttrId,
            value: s.size,
            attribute_Name_En: "Size",
          });
        }
        if (colorAttrId && c) {
          attrsArr.push({
            attribute_Id: colorAttrId,
            value: c,
            attribute_Name_En: "Color",
          });
        }

        out.push({
          price: basePrice,
          qauintity: qty,
          variant_Attributes: attrsArr,
        });
      }
    }
    return out;
  }, [
    colors,
    sizes,
    multipleSizes,
    multipleColors,
    oneSizeAndColor,
    form.basic_Price,
    sizeAttrId,
    colorAttrId,
  ]);

  useEffect(() => {
    // Keep the existing submission flow, but generate variants JSON from the UI.
    setVariantsJson(JSON.stringify(buildVariantsFromUi, null, 2));
  }, [buildVariantsFromUi]);

  useEffect(() => {
    // Auto-select Size/Color attributes for create flow.
    // (Update flow does not use attribute_Ids.)
    setAttributeIds((prev) => {
      const next = new Set(prev);
      if (sizeAttrId) next.add(sizeAttrId);
      if (colorAttrId) next.add(colorAttrId);
      return [...next];
    });
  }, [sizeAttrId, colorAttrId]);

  const coverPreviewUrl = useMemo(() => {
    if (!cover) return null;
    return URL.createObjectURL(cover);
  }, [cover]);

  const imagePreviewUrls = useMemo(() => {
    return (images || []).map((f) => ({ file: f, url: URL.createObjectURL(f) }));
  }, [images]);

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
      imagePreviewUrls.forEach((x) => URL.revokeObjectURL(x.url));
    };
  }, [coverPreviewUrl, imagePreviewUrls]);

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
    // If the backend returned variants, keep them as a fallback.
    // The UI below can be used to regenerate them.
    setVariantsJson(JSON.stringify(p.variants || [], null, 2));

    // Try to seed UI sizes/colors from variants
    const v = Array.isArray(p.variants) ? p.variants : [];
    const sizeSet = new Map();
    const colorSet = new Set();
    v.forEach((variant) => {
      const attrsArr = variant?.variant_Attributes || [];
      const sizeAttr = attrsArr.find((a) => String(a.attribute_Name_En || "").toLowerCase() === "size");
      const colorAttr = attrsArr.find((a) => String(a.attribute_Name_En || "").toLowerCase() === "color");
      const sizeVal = sizeAttr?.value;
      const colorVal = colorAttr?.value;
      if (typeof colorVal === "string" && colorVal.trim()) colorSet.add(colorVal.trim());
      if (typeof sizeVal === "string" && sizeVal.trim()) {
        const qty = Number(variant?.qauintity ?? variant?.quantity ?? variant?.quentity ?? 0);
        sizeSet.set(sizeVal.trim(), qty || sizeSet.get(sizeVal.trim()) || 0);
      }
    });
    if (sizeSet.size) {
      setSizes([...sizeSet.entries()].map(([size, quantity]) => ({ size, quantity })));
    }
    if (colorSet.size) {
      setColors([...colorSet]);
    }
  }, [isEdit, productQuery.data]);

  const title = useMemo(
    () => (isEdit ? "Edit Product" : "Add Product"),
    [isEdit]
  );

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

  const canGoNext =
    form.product_Name_Ar.trim() &&
    form.product_Name_En.trim() &&
    String(form.category_Id || "").trim();

  const handleAddColor = () => {
    const v = colorInput.trim();
    if (!v) return;
    setColors((prev) => (prev.includes(v) ? prev : [...prev, v]));
    setColorInput("");
  };

  const handleAddSize = () => {
    const s = sizeInput.trim();
    const q = Number(qtyInput || 0);
    if (!s || !Number.isFinite(q) || q <= 0) return;
    setSizes((prev) => {
      const idx = prev.findIndex((x) => x.size === s);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { size: s, quantity: q };
        return next;
      }
      return [...prev, { size: s, quantity: q }];
    });
    setSizeInput("");
    setQtyInput("");
  };

  const sizeRowsForTable = useMemo(() => {
    const basePrice = Number(form.basic_Price || 0);
    return sizes.map((s, idx) => ({
      id: `${s.size}-${idx}`,
      size: s.size,
      colors,
      price: basePrice,
      quantity: Number(s.quantity || 0),
    }));
  }, [sizes, colors, form.basic_Price]);

  const columns = useMemo(
    () => [
      { key: "size", header: "Sizes" },
      {
        key: "colors",
        header: "Available Colors Of Size",
        render: (r) => (
          <div className="flex items-center gap-1.5">
            {(r.colors || []).slice(0, 6).map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="w-3.5 h-3.5 rounded-full border border-black/10"
                title={c}
                style={{ backgroundColor: c.startsWith("#") ? c : "#9ca3af" }}
              />
            ))}
            {(r.colors || []).length > 6 && (
              <span className="text-xs text-text-secondary">
                +{(r.colors || []).length - 6}
              </span>
            )}
          </div>
        ),
      },
      {
        key: "price",
        header: "Price",
        render: (r) => (
          <span className="text-brand-primary font-semibold">
            {Number(r.price || 0).toFixed(2)}
          </span>
        ),
      },
      {
        key: "quantity",
        header: "Available Quantity",
        render: (r) => (
          <span className="text-brand-primary font-semibold">
            {Number(r.quantity || 0)}
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
        className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{title}</span>
      </button>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left content */}
        <div className="lg:col-span-8 space-y-6">
          {step === 1 ? (
            <div className="bg-background-white rounded-2xl shadow-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cover */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-text-primary">Upload Main Image</div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => coverInputRef.current?.click()}
                    onKeyDown={(e) => e.key === "Enter" && coverInputRef.current?.click()}
                    className="h-[220px] rounded-2xl border border-border-light bg-background-primary flex items-center justify-center relative overflow-hidden cursor-pointer"
                  >
                    {coverPreviewUrl ? (
                      <>
                        <img
                          src={coverPreviewUrl}
                          alt="cover"
                          className="w-full h-full object-contain bg-white"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCover(null);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center"
                          aria-label="Remove cover image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-text-secondary">
                        <ImagePlus className="w-10 h-10 opacity-60" />
                        <div className="mt-2 text-xs">Upload Main Image</div>
                      </div>
                    )}
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setCover(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                {/* Other images */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-text-primary">Upload Other Image</div>
                  <div className="grid grid-cols-12 gap-4">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => imagesInputRef.current?.click()}
                      onKeyDown={(e) => e.key === "Enter" && imagesInputRef.current?.click()}
                      className="col-span-8 h-[220px] rounded-2xl border border-border-light bg-background-primary flex items-center justify-center cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-text-secondary">
                        <ImagePlus className="w-10 h-10 opacity-60" />
                        <div className="mt-2 text-xs">Upload Other Image</div>
                      </div>
                      <input
                        ref={imagesInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => setImages(Array.from(e.target.files || []))}
                      />
                    </div>

                    <div className="col-span-4 space-y-3">
                      {imagePreviewUrls.slice(0, 3).map(({ url }, idx) => (
                        <div
                          key={url}
                          className="relative w-full aspect-square rounded-xl overflow-hidden bg-white border border-border-light"
                        >
                          <img src={url} alt={`img-${idx}`} className="w-full h-full object-contain" />
                          <button
                            type="button"
                            onClick={() =>
                              setImages((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center"
                            aria-label="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fields */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">Name in Arabic</label>
                    <input
                      value={form.product_Name_Ar}
                      onChange={(e) => setForm((p) => ({ ...p, product_Name_Ar: e.target.value }))}
                      className="w-full bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">Name in English</label>
                    <input
                      value={form.product_Name_En}
                      onChange={(e) => setForm((p) => ({ ...p, product_Name_En: e.target.value }))}
                      className="w-full bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-text-secondary mb-1.5">Price</label>
                    <input
                      type="number"
                      value={form.basic_Price}
                      onChange={(e) => setForm((p) => ({ ...p, basic_Price: e.target.value }))}
                      className="w-full bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-text-secondary mb-1.5">Category</label>
                    <select
                      value={form.category_Id}
                      onChange={(e) => setForm((p) => ({ ...p, category_Id: e.target.value }))}
                      className="w-full bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
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
                    <label className="block text-xs text-text-secondary mb-1.5">Stock quantity</label>
                    <input
                      type="number"
                      value={form.basic_stock_Quantity}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, basic_stock_Quantity: e.target.value }))
                      }
                      className="w-full bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-text-secondary mb-1.5">Product Description</label>
                    <textarea
                      value={form.description_En}
                      onChange={(e) => setForm((p) => ({ ...p, description_En: e.target.value }))}
                      rows={5}
                      className="w-full bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="button"
                    disabled={!canGoNext}
                    onClick={() => setStep(2)}
                    className="w-full md:w-[360px] bg-[#FC813B] hover:bg-[#e6733a] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
                  >
                    next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-background-white rounded-2xl shadow-card p-6 space-y-5">
              <div className="space-y-4">
                <div className="text-sm font-medium text-text-primary">
                  Are there multiple colors and sizes of the product?
                </div>
                <div className="flex flex-wrap items-center gap-6 text-xs text-text-secondary">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={multipleSizes}
                      onChange={(e) => {
                        setMultipleSizes(e.target.checked);
                        if (e.target.checked) setOneSizeAndColor(false);
                      }}
                    />
                    <span className="text-[#FC813B]">There are multiple sizes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={multipleColors}
                      onChange={(e) => {
                        setMultipleColors(e.target.checked);
                        if (e.target.checked) setOneSizeAndColor(false);
                      }}
                    />
                    <span className="text-[#FC813B]">There are multiple colors</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={oneSizeAndColor}
                      onChange={(e) => {
                        const v = e.target.checked;
                        setOneSizeAndColor(v);
                        if (v) {
                          setMultipleSizes(false);
                          setMultipleColors(false);
                        }
                      }}
                    />
                    <span>There is one size and color</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Colors */}
                <div>
                  <div className="text-xs text-text-secondary mb-2">color</div>
                  <div className="flex items-center gap-2">
                    <input
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      placeholder="color"
                      className="flex-1 bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="bg-[#FC813B] hover:bg-[#e6733a] text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setConfirmRemoveColor(c)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs"
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/30"
                          style={{ backgroundColor: c.startsWith("#") ? c : "#9ca3af" }}
                        />
                        <span>{c}</span>
                        <X className="w-3.5 h-3.5 opacity-80" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes & qty */}
                <div>
                  <div className="text-xs text-text-secondary mb-2">Sizes and quantities</div>
                  <div className="grid grid-cols-12 gap-2">
                    <input
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      placeholder="color"
                      className="col-span-6 bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <input
                      value={qtyInput}
                      onChange={(e) => setQtyInput(e.target.value)}
                      placeholder="Quantity"
                      className="col-span-4 bg-[#F7F7F8] border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddSize}
                      className="col-span-2 bg-[#FC813B] hover:bg-[#e6733a] text-white rounded-lg font-semibold"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setConfirmRemoveSize(s.size)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs"
                      >
                        <span>{s.size}</span>
                        <span className="opacity-70">/</span>
                        <span>{s.quantity}</span>
                        <X className="w-3.5 h-3.5 opacity-80" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <DataTable
                columns={columns}
                rows={sizeRowsForTable}
                keyField="id"
                actionsHeader="Actions"
                renderActions={(row) => (
                  <>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-background-primary hover:bg-background-primary/70 flex items-center justify-center"
                      aria-label="Edit"
                      title="Edit"
                      onClick={() => {
                        setSizeInput(row.size);
                        setQtyInput(String(row.quantity));
                      }}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center"
                      aria-label="Delete"
                      title="Delete"
                      onClick={() => setConfirmRemoveSize(row.size)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                )}
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {(createMutation.isError || updateMutation.isError) && (
            <div className="text-red-600 text-sm">
              {(createMutation.error?.message || updateMutation.error?.message) ?? "Error"}
            </div>
          )}

          {/* Keep variantsJson for backend submission/debug */}
          <input type="hidden" value={variantsJson} readOnly />
        </div>

        {/* Right stepper */}
        <div className="lg:col-span-4">
          <div className="bg-background-white rounded-2xl shadow-card p-6 sticky top-6">
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full flex items-center gap-3 text-left"
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full ${
                    step === 1 ? "bg-[#FC813B]" : "bg-[#E5E7EB]"
                  }`}
                />
                <span className={`text-sm ${step === 1 ? "text-[#FC813B]" : "text-text-secondary"}`}>
                  Basic Product Information
                </span>
              </button>

              <div className="pl-[14px]">
                <div className="w-[2px] h-8 bg-[#E5E7EB]" />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full flex items-center gap-3 text-left"
                disabled={!canGoNext}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full ${
                    step === 2 ? "bg-[#FC813B]" : "bg-[#E5E7EB]"
                  }`}
                />
                <span className={`text-sm ${step === 2 ? "text-[#FC813B]" : "text-text-secondary"}`}>
                  Sizes, Colors And Quantities
                </span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || step !== 2}
              className="mt-6 w-full bg-[#FC813B] hover:bg-[#e6733a] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
            >
              {loading ? "Loading..." : isEdit ? "Update Product" : "Add Product"}
            </button>

            <p className="mt-3 text-xs text-text-secondary">
              Tip: Complete step 1, then step 2 to enable saving.
            </p>
          </div>
        </div>
      </form>

      <ConfirmModal
        open={!!confirmRemoveColor}
        title="Remove color?"
        message={String(confirmRemoveColor || "")}
        confirmText="Remove"
        cancelText="Cancel"
        confirmVariant="danger"
        onClose={() => setConfirmRemoveColor(null)}
        onConfirm={() => {
          const c = confirmRemoveColor;
          setColors((prev) => prev.filter((x) => x !== c));
          setConfirmRemoveColor(null);
        }}
      />

      <ConfirmModal
        open={!!confirmRemoveSize}
        title="Remove size?"
        message={String(confirmRemoveSize || "")}
        confirmText="Remove"
        cancelText="Cancel"
        confirmVariant="danger"
        onClose={() => setConfirmRemoveSize(null)}
        onConfirm={() => {
          const s = confirmRemoveSize;
          setSizes((prev) => prev.filter((x) => x.size !== s));
          setConfirmRemoveSize(null);
        }}
      />
    </div>
  );
};

export default AdminProductUpsert;

