import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const DiscountedProducts = ({ timeLeft }) => {
  const { t } = useTranslation();
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatTime = (value) => String(value).padStart(2, "0");
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
          {[...Array(10)].map((_, i) => (
            <ProductCard
              discountPercent={10}
              key={i}
              imageSrc="/images/watchimg.png"
              showHoverActions={true}
              title="Mac Book pro2"
              price={50.55}
              oldPrice={60.55}
              currency="$"
            />
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
            className="product-card-swiper"
          >
            {[...Array(10)].map((_, i) => (
              <SwiperSlide key={i}>
                <ProductCard
                  imageSrc="/images/watchimg.png"
                  showHoverActions={true}
                  title="Mac Book pro2"
                  price={50.55}
                  oldPrice={60.55}
                  discountPercent={10}
                  currency="$"
                  onBuy={() => {}}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default DiscountedProducts;
