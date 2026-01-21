import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/productsHooks";
import DataTable from "../../components/admin/common/DataTable";
import ConfirmModal from "../../components/admin/common/ConfirmModal";
import Modal from "../../components/admin/common/Modal";
import {
  useBlockProduct,
  useDeleteProduct,
  useUnBlockProduct,
} from "../../hooks/adminProductsHooks";
import { resolveApiAssetUrl } from "../../utils";

function getVariantQty(v) {
  return (
    v?.qauintity ??
    v?.quantity ??
    v?.quentity ??
    v?.qauintity ??
    0
  );
}

const AdminProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);

  const productQuery = useProduct(productId);
  const delMutation = useDeleteProduct();
  const blockMutation = useBlockProduct();
  const unBlockMutation = useUnBlockProduct();

  const [activeImage, setActiveImage] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discount, setDiscount] = useState("");

  const data = productQuery.data;
  const images = data?.images || [];
  const variants = data?.variants || [];
  const isBlocked = !!data?.is_Block;

  const variantColumns = useMemo(
    () => [
      {
        key: "variant_Attributes",
        header: "Attributes",
        render: (r) => {
          const attrs = r.variant_Attributes || [];
          if (!attrs.length) return "—";
          return (
            <div className="flex flex-wrap gap-1.5">
              {attrs.slice(0, 4).map((a) => (
                <span
                  key={a.variant_Attribute_Id || `${a.attribute_Id}-${a.value}`}
                  className="px-2 py-1 rounded-full bg-background-primary text-xs text-text-primary"
                >
                  {a.attribute_Name_En || a.attribute_Name_Ar || "Attr"}: {a.value}
                </span>
              ))}
              {attrs.length > 4 && (
                <span className="px-2 py-1 rounded-full bg-background-primary text-xs text-text-secondary">
                  +{attrs.length - 4}
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
            className="w-10 h-10 rounded-full bg-background-white shadow-card border border-border-light"
            title={isBlocked ? "Unblock" : "Block"}
            onClick={async () => {
              try {
                if (isBlocked) await unBlockMutation.mutateAsync(productId);
                else await blockMutation.mutateAsync(productId);
              } catch {
                // ignore
              }
            }}
          >
            🚫
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-background-white shadow-card border border-border-light"
            title="Edit"
            onClick={() => navigate(`/admin/products/${productId}/edit`)}
          >
            ✎
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-background-white shadow-card border border-border-light"
            title="Discount"
            onClick={() => setDiscountOpen(true)}
          >
            %
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-background-white shadow-card border border-border-light text-red-600"
            title="Delete"
            onClick={() => setConfirmDelete(true)}
          >
            🗑
          </button>
        </div>
      </div>

      <div className="bg-background-white rounded-2xl shadow-card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Images */}
          <div className="lg:col-span-5 grid grid-cols-5 gap-4">
            <div className="col-span-1 space-y-3">
              {images.slice(0, 6).map((img, idx) => (
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
            <div className="col-span-4 bg-background-primary rounded-2xl overflow-hidden flex items-center justify-center">
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
            className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-3 rounded-lg font-semibold"
            onClick={() => {
              // NOTE: Swagger does not provide a dedicated discount endpoint.
              // We'll wire this to UpdateProduct when the backend requirements are confirmed.
              setDiscountOpen(false);
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
        onClose={() => setConfirmDelete(false)}
        loading={delMutation.isPending}
        onConfirm={async () => {
          try {
            await delMutation.mutateAsync(productId);
            setConfirmDelete(false);
            navigate("/admin/products");
          } catch {
            // ignore
          }
        }}
      />
    </div>
  );
};

export default AdminProductDetails;

