import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/common/ProductCard";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "../context";
import { useProduct, useProducts } from "../hooks/productsHooks";
import { resolveApiAssetUrl } from "../utils";

const ProductOne = () => {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();

  const { data: product, isLoading } = useProduct(productId);

  const { data: relatedData } = useProducts({
    category_Id: product?.category_Id,
    PageNumber: 1,
    PageSize: 10,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // ===== Images =====
  const images = useMemo(() => {
    if (!product) return [];
    if (product.images?.length) {
      return product.images.map(
        (i) => resolveApiAssetUrl(i.image_Path, "ProdImg") || "/images/watchimg.png"
      );
    }
    return product?.base_Image
      ? [resolveApiAssetUrl(product.base_Image, "ProdImg") || "/images/watchimg.png"]
      : [];
  }, [product]);

  useEffect(() => {
    if (selectedImage >= images.length) setSelectedImage(0);
  }, [images.length, selectedImage]);

  if (isLoading || !product) return <p className="p-10">{t("common.loading")}</p>;

  // ===== Prices =====
  const price =
    typeof product.basic_Price === "number"
      ? product.basic_Price
      : null;

  const discount =
    typeof product.discount_Percent === "number"
      ? product.discount_Percent
      : 0;

  const oldPrice =
    product.is_Discount && price !== null
      ? price / (1 - discount / 100)
      : null;

  // ===== Sizes =====
  const sizes =
    product.variants
      ?.flatMap((v) =>
        v.variant_Attributes.filter(
          (a) => a.attribute_Name_En === "Size"
        )
      )
      .map((a) => a.value) || [];

  const products = relatedData?.products || [];

  const handleAddToCart = () => {
    let variant = null;
  
    if (sizes.length > 0) {
      // If there are sizes, the user must select one first.
      variant = product.variants.find((v) =>
        v.variant_Attributes.some((a) => a.value === selectedSize)
      );
  
      if (!variant) {
        alert(t("product.selectSizeFirst", { defaultValue: "Please select a size first." }));
        return;
      }
    } else {
      // No sizes available → use the first variant (if any).
      variant = product.variants[0];
    }
  
    if (!variant) {
      alert(t("product.variantNotFound", { defaultValue: "Variant not found." }));
      return;
    }
  
    addItem({
      productId: product.product_Id,
      variantId: variant.variant_Id,
      name:
        i18n.language === "ar"
          ? product.product_Name_Ar
          : product.product_Name_En,
      // If the variant has no price, fall back to the base product price.
      price: variant.price ?? product.basic_Price ?? 0,
      quantity,
      image: images[0], // First image
    });
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 lg:px-8 py-10">
        {/* ===== DETAILS ===== */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Images */}
          <div className="lg:col-span-6 bg-white p-6 rounded-lg grid grid-cols-12 gap-4">
            <div className="col-span-3 flex flex-col gap-3">
              {images.map((img, i) => (
                <img
                  alt={`Product ${i + 1}`}
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(i)}
                  className={`cursor-pointer border rounded ${
                    selectedImage === i ? "border-orange-500" : ""
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = "/images/watchimg.png";
                  }}
                />
              ))}
            </div>

            <div className="col-span-9 flex items-center justify-center bg-gray-100 rounded">
              <img
                src={images[selectedImage]}
                alt="Selected product"
                className="max-h-[400px]"
                onError={(e) => {
                  e.currentTarget.src = "/images/watchimg.png";
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-6">
            <h1 className="text-3xl font-bold">
              {i18n.language === "ar"
                ? product.product_Name_Ar
                : product.product_Name_En}
            </h1>

            <p className="mt-4 text-gray-600">
              {i18n.language === "ar"
                ? product.description_Ar
                : product.description_En}
            </p>

            <div className="mt-4 flex gap-4 items-center">
              {price !== null && (
                <span className="text-3xl text-orange-500">
                  {price.toFixed(2)} EGP
                </span>
              )}

              {oldPrice !== null && (
                <span className="line-through text-gray-400">
                  {oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mt-6">
                <h3>{t("product.availableSizes")}</h3>
                <div className="flex gap-2 mt-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 border ${
                        selectedSize === s
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6 flex gap-4">
              <div className="flex border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus />
                </button>
                <input value={quantity} readOnly className="w-12 text-center" />
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-orange-500 text-white px-6 py-3 flex gap-2"
              >
                <ShoppingCart />
                {t("common.addToCart")}
              </button>
            </div>
          </div>
        </div>

        {/* ===== RELATED ===== */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            {t("product.relatedProducts")}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.product_Id}
                imageSrc={p.base_Image}
                title={
                  i18n.language === "ar"
                    ? p.product_Name_Ar
                    : p.product_Name_En
                }
                description={
                  (i18n.language === "ar"
                    ? p.description_Ar
                    : p.description_En
                  )?.slice(0, 80) + ((i18n.language === "ar"
                    ? p.description_Ar
                    : p.description_En
                  )?.length > 80 ? "..." : "")
                }
                price={p.basic_Price}
                discountPercent={p.discount_Percent}
                oldPrice={
                  p.is_Discount && typeof p.basic_Price === "number"
                    ? p.basic_Price / (1 - p.discount_Percent / 100)
                    : null
                }
                onBuy={() => navigate(`/product/${p.product_Id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOne;
