import { Monitor, Lock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { categoryCards } from "../../lib/data";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductsCategories = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="mb-4 lg:mb-6">
          <p className={`text-sm lg:text-base text-[#FC813B] mb-2 ${isRTL ? "text-right" : "text-left"}`}>
            {t("common.topCategories")}
          </p>
          <h2 className={`text-2xl lg:text-3xl font-bold text-[#212844] ${isRTL ? "text-right" : "text-left"}`}>
            {t("common.productCategories")}
          </h2>
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 lg:gap-6">
          {categoryCards.map((category) => (
            <div
              key={category.id}
              className="bg-background-white rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FFE4CF] flex items-center justify-center mb-4 relative">
                <Monitor className="w-8 h-8 text-[#FC813B]" />
                <Lock className="w-3 h-3 text-[#FC813B] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="text-base font-semibold text-[#202232] mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-[#4B4B4B]">
                {category.productsCount} {t("common.products")}
              </p>
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
                <div className="bg-background-white rounded-xl p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#FFE4CF] flex items-center justify-center mb-4 relative">
                    <Monitor className="w-8 h-8 text-[#FC813B]" />
                    <Lock className="w-3 h-3 text-[#FC813B] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-base font-semibold text-[#202232] mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#4B4B4B]">
                    {category.productsCount} {t("common.products")}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductsCategories;
