import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/productsHooks";
import DataTable from "../../components/admin/common/DataTable";
import ConfirmModal from "../../components/admin/common/ConfirmModal";
import Modal from "../../components/admin/common/Modal";
import { useDeleteProduct } from "../../hooks/adminProductsHooks";
import { resolveApiAssetUrl } from "../../utils";
import { Pencil, Percent, Trash2 } from "lucide-react";

function getVariantQty(v) {
  return (
    v?.qauintity ??
    v?.quantity ??
    v?.quentity ??
    v?.qauintity ??
    0
  );
}

function getAttrValue(variant, name) {
  const attrs = variant?.variant_Attributes || [];
  const n = String(name || "").toLowerCase();
  const hit = attrs.find((a) => {
    const en = String(a.attribute_Name_En || "").toLowerCase();
    const ar = String(a.attribute_Name_Ar || "").toLowerCase();
    return en === n || ar === n;
  });
  return hit?.value ?? null;
}

function normalizeColorToHex(value) {
  const v = String(value || "").trim().toLowerCase();
  if (!v) return null;
  if (v.startsWith("#") && (v.length === 4 || v.length === 7)) return v;
  const map = {
    black: "#111827",
    white: "#ffffff",
    red: "#ef4444",
    green: "#22c55e",
    blue: "#3b82f6",
    yellow: "#eab308",
    orange: "#f97316",
    purple: "#a855f7",
    pink: "#ec4899",
    gray: "#6b7280",
    grey: "#6b7280",
    brown: "#92400e",
  };
  return map[v] || null;
}

const AdminProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const productId = Number(id);

  const productQuery = useProduct(productId);
  const delMutation = useDeleteProduct();

  const [activeImage, setActiveImage] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [didDelete, setDidDelete] = useState(false);

  const data = productQuery.data;
  const images = data?.images || [];
  const variants = data?.variants || [];

  useEffect(() => {
    const shouldOpen = !!location?.state?.openDiscount;
    if (!shouldOpen) return;
    setDiscountOpen(true);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location?.state, location.pathname, navigate]);

  const variantColumns = useMemo(
    () => [
      {
        key: "size",
        header: "Sizes",
        render: (r) => getAttrValue(r, "Size") || "—",
      },
      {
        key: "colors",
        header: "Available Colors Of Size",
        render: (r) => {
          const raw = getAttrValue(r, "Color");
          const values = raw
            ? String(raw)
                .split(/[,|/]/)
                .map((x) => x.trim())
                .filter(Boolean)
            : [];
          if (!values.length) return "—";

          return (
            <div className="flex items-center gap-1.5">
              {values.slice(0, 6).map((v, idx) => {
                const hex = normalizeColorToHex(v);
                return (
                  <span
                    key={`${v}-${idx}`}
                    title={v}
                    className="w-3.5 h-3.5 rounded-full border border-black/10"
                    style={{ backgroundColor: hex || "#9ca3af" }}
                  />
                );
              })}
              {values.length > 6 && (
                <span className="text-xs text-text-secondary">
                  +{values.length - 6}
                </span>
              )}
            </div>
          );
        },
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
        key: "qauintity",
        header: "Available Quantity",
        render: (r) => (
          <span className="text-brand-primary font-semibold">
            {Number(getVariantQty(r) || 0)}
          </span>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        render: () => (
          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-background-primary hover:bg-background-primary/70 flex items-center justify-center"
              aria-label="Edit variant"
              title="Edit"
              onClick={() => {}}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center"
              aria-label="Delete variant"
              title="Delete"
              onClick={() => {}}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
        headerClassName: "text-right",
        cellClassName: "text-right",
      },
    ],
    []
  );

  if (productQuery.isLoading) return <div className="text-text-secondary">Loading...</div>;
  if (productQuery.isError)
    return <div className="text-red-600">{productQuery.error?.message || "Error"}</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="text-text-secondary hover:text-text-primary"
          onClick={() => navigate(-1)}
        >
          ← Product Details
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#EAF7EF] text-[#1F9D55] hover:bg-[#DFF3E7] flex items-center justify-center"
            title="Discount"
            onClick={() => setDiscountOpen(true)}
          >
            <Percent className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-background-primary hover:bg-background-primary/70 flex items-center justify-center"
            title="Edit"
            onClick={() => navigate(`/admin/products/${productId}/edit`)}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center"
            title="Delete"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-background-white rounded-2xl shadow-card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Images */}
          <div className="lg:col-span-5 grid grid-cols-12 gap-4">
            <div className="col-span-3 space-y-3">
              {images.slice(0, 4).map((img, idx) => (
                <button
                  type="button"
                  key={img.image_Id || img.image_Path || idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-full aspect-square rounded-xl overflow-hidden border ${
                    idx === activeImage ? "border-brand-primary" : "border-border-light"
                  }`}
                >
                  <img
                    src={resolveApiAssetUrl(img.image_Path, "ProdImg") || "/images/watchimg.png"}
                    alt="thumb"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/watchimg.png";
                    }}
                  />
                </button>
              ))}
            </div>
            <div className="col-span-9 bg-background-primary rounded-2xl overflow-hidden flex items-center justify-center min-h-[280px]">
              {images[activeImage]?.image_Path ? (
                <img
                  src={
                    resolveApiAssetUrl(images[activeImage].image_Path, "ProdImg") ||
                    "/images/watchimg.png"
                  }
                  alt="product"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/images/watchimg.png";
                  }}
                />
              ) : (
                <div className="text-text-secondary">No image</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-text-secondary">Product Name In Arabic</div>
                <div className="text-text-primary font-semibold">
                  {data?.product_Name_Ar || "—"}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-text-secondary">Product Name In English</div>
                <div className="text-text-primary font-semibold">
                  {data?.product_Name_En || "—"}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-text-secondary">Product Price Before Discount</div>
                <div className="text-brand-primary font-semibold">
                  {Number(data?.basic_Price || 0).toFixed(2)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-text-secondary">Product Price After Discount</div>
                <div className="text-brand-primary font-semibold">
                  {Number(data?.basic_Price || 0).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="text-text-secondary text-sm mb-2">Product Description</div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {data?.description_En || data?.description_Ar || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DataTable columns={variantColumns} rows={variants} keyField="variant_Id" />

      <Modal
        open={discountOpen}
        title="Add A Discount To The Product"
        onClose={() => setDiscountOpen(false)}
        maxWidthClass="max-w-xl"
      >
        <div className="space-y-4">
          <label className="block text-sm text-text-secondary">Discount rate</label>
          <input
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Discount rate"
            className="w-full bg-background-primary border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <button
            type="button"
            className="w-full bg-[#FC813B] hover:bg-[#e6733a] text-white py-3 rounded-xl font-semibold"
            onClick={() => {
              setDiscountOpen(false);
              setSuccessOpen(true);
            }}
          >
            Add
          </button>
        </div>
      </Modal>

      <ConfirmModal
        open={confirmDelete}
        title="Are You Sure You Want To Delete This Product?"
        confirmText="Delete"
        cancelText="Back"
        layout="stacked"
        showIcon
        onClose={() => setConfirmDelete(false)}
        loading={delMutation.isPending}
        onConfirm={async () => {
          try {
            await delMutation.mutateAsync(productId);
            setConfirmDelete(false);
            setDidDelete(true);
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
            onClick={() => {
              setSuccessOpen(false);
              if (didDelete) navigate("/admin/products");
              setDidDelete(false);
            }}
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
              onClick={() => {
                setSuccessOpen(false);
                if (didDelete) navigate("/admin/products");
                setDidDelete(false);
              }}
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

export default AdminProductDetails;

