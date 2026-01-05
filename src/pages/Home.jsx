import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroSection from "../components/homeOne/HeroSection";
import CategoriesSection from "../components/homeOne/CategoriesSection";
import ProductCard from "../components/common/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroBanner from "../components/common/HeroBanner";
import DiscountedProducts from "../components/common/DiscountedProducts";
import { useState, useEffect } from "react";
const Home = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const { t } = useTranslation();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 24 * 60 * 60; // Reset to 24 hours
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-background-light-gray">
      <Header />
      <HeroSection />
      <CategoriesSection />
      {/* popular products section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <h2
          className="text-start"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: "25px",
            lineHeight: "120%",
            letterSpacing: "0%",
            marginBottom: "20px",
          }}
        >
          {t("common.popularProducts")}
        </h2>
        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {[...Array(10)].map((_, i) => (
            <ProductCard
              key={i}
              imageSrc="/images/watchimg.png"
              showHoverActions={true}
              title="Mac Book pro2"
              price={50.55}
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
                  currency="$"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-6 lg:mt-8">
          <HeroBanner
            backgroundImage="#212844"
            productImage="laptop.png"
            productAlt="laptop"
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

      {/* discounted products section */}
      <DiscountedProducts timeLeft={timeLeft} />

      <Footer />
    </div>
  );
};

export default Home;
