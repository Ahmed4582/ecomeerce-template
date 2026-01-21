import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/productsHooks";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function DiscountedProducts({ timeLeft }) {
  const API_BASE_URL = (process.env.REACT_APP_API_URL ||
    "https://apistore2.onpoint-teasting.com"
  ).replace(/\/$/, "");
  const PROD_IMG_BASE_URL = `${API_BASE_URL}/ProdImg`;
  const FALLBACK_PRODUCT_IMAGE = "/images/watchimg.png";

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatTime = (value) => String(value).padStart(2, "0");
  const emptyMsg = t("discounts.emptyShort", {
    defaultValue: "No discounted products available right now.",
  });
  const errorMsg = t("discounts.error", {
    defaultValue: "Failed to load discounted products.",
  });

  const { data, isLoading, isError } = useProducts({
    PageNumber: 1,
    PageSize: 30,
  });

  const discountedProducts = useMemo(() => {
    const list = data?.products || [];
    return list
      .filter((p) => {
        const rawDiscount = p?.discount_Percent;
        const discount =
          typeof rawDiscount === "number"
            ? rawDiscount
            : typeof rawDiscount === "string"
              ? Number(rawDiscount)
              : 0;

        const isDiscountFlag =
          p?.is_Discount === true || p?.is_Discount === 1 || p?.is_Discount === "1";

        return isDiscountFlag || (Number.isFinite(discount) && discount > 0);
      })
      .slice(0, 10);
  }, [data]);

  const skeletonCount = 10;

  // If there are no discounted products, don't render the big section (title + timer + grids).
  // Show a compact "coming soon" callout instead, so the page doesn't look broken/empty.
  if (!isLoading && !isError && discountedProducts.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-[#FC813B]">
            {t("discounts.label", { defaultValue: "Discounts" })}
          </div>
          <div className="mt-2 text-lg font-semibold text-[#212844]">
            {t("discounts.noneTitle", {
              defaultValue: "No discounted products right now",
            })}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {t("discounts.noneHint", {
              defaultValue: "Coming soon — new offers will be added.",
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 lg:mb-6 gap-3 sm:gap-4">
          <div>
            <p className="text-sm lg:text-base text-[#FC813B] mb-2">
              {t("common.discountWithin24Hours")}
            </p>
            <h2
              className="text-start"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "25px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              {t("common.discountedProducts")}
            </h2>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="text-[#FC813B] font-semibold text-base sm:text-lg">
                {formatTime(hours)}
              </span>
            </div>
            <span className="text-[#212844] font-semibold text-lg sm:text-xl">
              :
            </span>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="text-[#FC813B] font-semibold text-base sm:text-lg">
                {formatTime(minutes)}
              </span>
            </div>
            <span className="text-[#212844] font-semibold text-lg sm:text-xl">
              :
            </span>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="text-[#FC813B] font-semibold text-base sm:text-lg">
                {formatTime(seconds)}
              </span>
            </div>
            <span className="text-[#212844] font-semibold text-lg sm:text-xl">
              :
            </span>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="text-[#FC813B] font-semibold text-base sm:text-lg">
                00
              </span>
            </div>
          </div>
        </div>
        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={`discount-skeleton-${i}`}
                  className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse"
                >
                  <div className="h-[190px] bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))
            : isError
              ? (
                  <div className="col-span-full py-6 text-sm text-red-600">
                    {errorMsg}
                  </div>
                )
              : discountedProducts.length === 0
                ? (
                    <div className="col-span-full py-6 text-sm text-gray-500">
                      {emptyMsg}
                    </div>
                  )
                : discountedProducts.map((p) => {
                  const price =
                    typeof p.basic_Price === "number" ? p.basic_Price : undefined;
                  const discount =
                    typeof p.discount_Percent === "number"
                      ? p.discount_Percent
                      : undefined;
                  const oldPrice =
                    Boolean(p.is_Discount) &&
                    typeof price === "number" &&
                    typeof discount === "number" &&
                    discount > 0
                      ? price / (1 - discount / 100)
                      : undefined;

                  return (
                    <ProductCard
                      key={p.product_Id}
                      imageSrc={
                        p.base_Image
                          ? `${PROD_IMG_BASE_URL}/${p.base_Image}`
                          : FALLBACK_PRODUCT_IMAGE
                      }
                      title={
                        i18n.language === "ar"
                          ? p.product_Name_Ar
                          : p.product_Name_En
                      }
                      description={
                        i18n.language === "ar"
                          ? p.description_Ar
                          : p.description_En
                      }
                      price={price}
                      discountPercent={discount}
                      oldPrice={oldPrice}
                      currency="EGP"
                      showHoverActions
                      onBuy={() => navigate(`/product/${p.product_Id}`)}
                      onAddToCart={() => navigate(`/product/${p.product_Id}`)}
                    />
                  );
                })}
        </div>

        {/* Mobile/Tablet Swiper - Visible on small screens */}
        <div className="lg:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
            }}
            pagination={false}
            navigation={false}
            className="product-card-swiper"
          >
            {(isLoading
              ? Array.from({ length: skeletonCount }).map((_, i) => ({
                  product_Id: `discount-skeleton-${i}`,
                  __skeleton: true,
                }))
              : discountedProducts
            ).map((p) => (
              <SwiperSlide key={p.product_Id}>
                {"__skeleton" in p ? (
                  <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse">
                    <div className="h-[190px] bg-gray-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="h-5 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ) : (
                  <ProductCard
                    imageSrc={
                      p.base_Image
                        ? `${PROD_IMG_BASE_URL}/${p.base_Image}`
                        : FALLBACK_PRODUCT_IMAGE
                    }
                    title={
                      i18n.language === "ar"
                        ? p.product_Name_Ar
                        : p.product_Name_En
                    }
                    description={
                      i18n.language === "ar" ? p.description_Ar : p.description_En
                    }
                    price={
                      typeof p.basic_Price === "number" ? p.basic_Price : undefined
                    }
                    discountPercent={
                      typeof p.discount_Percent === "number"
                        ? p.discount_Percent
                        : undefined
                    }
                    oldPrice={
                      Boolean(p.is_Discount) &&
                      typeof p.basic_Price === "number" &&
                      typeof p.discount_Percent === "number" &&
                      p.discount_Percent > 0
                        ? p.basic_Price / (1 - p.discount_Percent / 100)
                        : undefined
                    }
                    currency="EGP"
                    showHoverActions
                    onBuy={() => navigate(`/product/${p.product_Id}`)}
                    onAddToCart={() => navigate(`/product/${p.product_Id}`)}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {isError && (
            <div className="mt-4 text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          {!isLoading && !isError && discountedProducts.length === 0 && (
            <div className="mt-4 text-sm text-gray-500">
              {emptyMsg}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
