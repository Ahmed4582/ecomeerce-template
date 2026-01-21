import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../hooks/categoriesHooks";
import HeroBanner from "../common/HeroBanner";
import { Link } from "react-router-dom";
import { resolveApiAssetUrl } from "../../utils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategoriesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [page] = useState(1);

  const { data, isLoading, isError } = useCategories({
    pageNumber: page,
    pageSize: 8,
  });

  if (isLoading) {
    return <p className="px-4 py-10">{t("common.loading")}</p>;
  }

  if (isError) {
    return <p className="px-4 py-10 text-red-500">Failed to load categories</p>;
  }

  const categories = data?.categories || [];

  return (
    <div id="categories-section" className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      {/* Section Title */}
      <h2 className="text-2xl lg:text-3xl font-bold text-[#212844] mb-4 lg:mb-6">
        {t("common.categories")}
      </h2>

      {/* ===== Desktop Grid ===== */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((category) => (
          <Link
            to={`/category/${category.category_Id}`}
            key={category.category_Id}
          >
            {(() => {
              const bgUrl = resolveApiAssetUrl(category.category_Image, "CateImg");
              return (
            <div
              key={category.category_Id}
              className="relative rounded-xl overflow-hidden shadow-lg min-h-[190px] group cursor-pointer"
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-gray-500"
                style={{
                  backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
                }}
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center p-6">
                <h3 className="text-xl text-white mb-1">
                  {isRTL
                    ? category.category_Name_Ar
                    : category.category_Name_Eng}
                </h3>
                <div
                  className={`flex items-center text-white font-medium mt-4 transition-transform ${
                    isRTL
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }`}
                >
                  {t("common.shopNow")}
                  <ArrowIcon className={`w-5 h-5 ${isRTL ? "mr-1" : "ml-1"}`} />
                </div>
              </div>
            </div>
              );
            })()}
          </Link>
        ))}
      </div>

      {/* ===== Mobile Swiper ===== */}
      <div className="lg:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.category_Id}>
              {(() => {
                const bgUrl = resolveApiAssetUrl(category.category_Image, "CateImg");
                return (
              <div className="relative rounded-xl overflow-hidden shadow-lg min-h-[200px] group">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-gray-500"
                  style={{
                    backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
                  }}
                >
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl text-white mb-2">
                      {isRTL
                        ? category.category_Name_Ar
                        : category.category_Name_Eng}
                    </h3>
                  </div>

                  <div
                    className={`flex items-center text-white transition-transform ${
                      isRTL
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  >
                    {t("common.shopNow")}
                    <ArrowIcon
                      className={`w-4 h-4 ${isRTL ? "mr-1" : "ml-1"}`}
                    />
                  </div>
                </div>
              </div>
                );
              })()}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hero Banner */}
      <div className="mt-6 lg:mt-8">
        <HeroBanner
          backgroundImage="#212844"
          productImage="watch.png"
          eyebrowText={t("common.bestDeal")}
          headline={t("common.smartWearable")}
          discountText={t("common.saleUpTo")}
          discountValue="48%"
          discountLabel={t("common.off")}
          showCta={false}
        />
      </div>
    </div>
  );
};

export default CategoriesSection;
