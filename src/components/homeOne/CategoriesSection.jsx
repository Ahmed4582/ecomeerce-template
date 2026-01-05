import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { categoryCards } from "../../lib/data";
import HeroBanner from "../common/HeroBanner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategoriesSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const getCategoryTranslation = (name) => {
    const categoryMap = {
      Electronics: "categories.electronics",
      "Home Lights": "categories.homeLights",
      Cosmetics: "categories.cosmetics",
      Furniture: "categories.furniture",
    };
    return categoryMap[name] || name;
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10 ">
      {/* Section Title */}
      <h2 className="text-2xl lg:text-3xl font-bold text-[#212844] mb-4 lg:mb-6">
        {t("common.categories")}
      </h2>

      {/* Desktop Grid - Hidden on mobile */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4 lg:gap-6">
        {categoryCards.map((category) => (
          <div
            key={category.id}
            className="relative rounded-xl overflow-hidden shadow-lg min-h-[320px] lg:min-h-[190px] group cursor-pointer"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${category.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center p-5 lg:p-6">
              <div className="flex flex-col justify-center">
                <h3 className="text-xl lg:text-2xl font-normal text-white mb-1">
                  {t(getCategoryTranslation(category.name))}
                </h3>
                <p className="text-sm lg:text-base text-[#FFFFFF] opacity-80">
                  {category.productsCount} {t("common.products")}
                </p>
                <div
                  className={`flex items-center text-white font-medium text-sm lg:text-xl mt-4 transition-transform ${
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
          </div>
        ))}
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
          className="categories-swiper"
        >
          {categoryCards.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="relative rounded-xl overflow-hidden shadow-lg min-h-[200px] group cursor-pointer">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-800"
                  style={{
                    backgroundImage: category.image
                      ? `url(${category.image})`
                      : "none",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t(getCategoryTranslation(category.name))}
                    </h3>
                    <p className="text-sm text-white/80">
                      {category.productsCount} {t("common.products")}
                    </p>
                  </div>
                  <div
                    className={`flex items-center text-white font-medium text-sm transition-transform ${
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-6 lg:mt-8">
        <HeroBanner
          backgroundImage="#212844"
          productImage="watch.png"
          productAlt="watch"
          eyebrowText={t("common.bestDeal")}
          headline={t("common.smartWearable")}
          discountText={t("common.saleUpTo")}
          discountValue="48%"
          discountLabel={t("common.off")}
          showCta={false}
          ctaText={t("common.shopNow")}
          onCtaClick={() => {}}
          activeDot={0}
          totalDots={6}
          showPaginationBottom={true}
          showSpan={true}
          discountTextColor="#FFFFFF7A"
          discountValueColor="#FFFFFF"
          headlineColor="#FFFFFF"
          eyebrowColor="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default CategoriesSection;
