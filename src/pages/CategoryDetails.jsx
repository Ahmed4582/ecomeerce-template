import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/categoriesHooks";
import { useProducts } from "../hooks/productsHooks";
import { useTranslation } from "react-i18next";
import { resolveApiAssetUrl, truncateText } from "../utils";
import ProductCard from "../components/common/ProductCard";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const CategoryDetails = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  const { data, isLoading, isError } = useCategory(id);
  const productsFilters = useMemo(
    () => ({
      category_Id: Number(id),
      PageNumber: 1,
      PageSize: 20,
    }),
    [id]
  );
  const productsQuery = useProducts(productsFilters);
  const products = productsQuery.data?.products || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-background-light-gray min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-text-secondary">{t("common.loading")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-background-light-gray min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-2">
                {t("common.errorLoading", {
                  defaultValue: "Error loading category",
                })}
              </p>
              <p className="text-text-secondary">
                {t("common.tryAgainLater", {
                  defaultValue: "Please try again later",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="bg-background-light-gray min-h-screen">
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-text-secondary">
              {t("common.noDataFound", { defaultValue: "No category found" })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const categoryName = isRTL ? data.category_Name_Ar : data.category_Name_Eng;
  const categoryImage = resolveApiAssetUrl(data.category_Image, "CateImg");

  return (
    <div className="bg-background-light-gray min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="max-w-6xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
          {/* Category Header Section */}
          <div className="bg-background-white rounded-card shadow-card p-6 sm:p-8 lg:p-10 mb-6 lg:mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Category Image */}
              <div
                className={`${
                  isRTL ? "lg:order-2" : "lg:order-1"
                } flex justify-center lg:justify-start`}
              >
                <div className="w-full max-w-md aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={categoryImage}
                    alt={categoryName}
                    className="w-full h-full object-cover"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = "/images/watchimg.png";
                    }}
                  />
                </div>
              </div>

              {/* Category Info */}
              <div
                className={`${
                  isRTL ? "lg:order-1 text-right" : "lg:order-2 text-left"
                } flex flex-col justify-center`}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                  {categoryName}
                </h1>
                {data.category_Description && (
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                    {isRTL
                      ? data.category_Description_Ar ||
                        data.category_Description
                      : data.category_Description_Eng ||
                        data.category_Description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-background-white rounded-card shadow-card p-6 sm:p-8">
            <h2
              className={`text-xl sm:text-2xl font-semibold text-text-primary mb-6 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("common.products", { defaultValue: "Products" })}
            </h2>

            {productsQuery.isLoading ? (
              <div className="text-text-secondary">
                {t("common.loading", { defaultValue: "Loading..." })}
              </div>
            ) : productsQuery.isError ? (
              <div className="text-red-600">
                {productsQuery.error?.message || "Error"}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-secondary">
                  {t("common.noProductsAvailable", {
                    defaultValue: "No products available in this category yet",
                  })}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((p) => (
                  <ProductCard
                    key={p.product_Id}
                    imageSrc={p.base_Image}
                    title={isRTL ? p.product_Name_Ar : p.product_Name_En}
                    description={truncateText(
                      String(isRTL ? p.description_Ar : p.description_En || ""),
                      90
                    )}
                    price={typeof p.basic_Price === "number" ? p.basic_Price : undefined}
                    discountPercent={
                      typeof p.discount_Percent === "number"
                        ? p.discount_Percent
                        : undefined
                    }
                    oldPrice={
                      p.is_Discount &&
                      typeof p.basic_Price === "number" &&
                      typeof p.discount_Percent === "number" &&
                      p.discount_Percent > 0
                        ? p.basic_Price / (1 - p.discount_Percent / 100)
                        : undefined
                    }
                    onBuy={() => navigate(`/product/${p.product_Id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
