import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroBanner from "../components/common/HeroBanner";
import { useTranslation } from "react-i18next";
import { homeTwoHeroBanners } from "../lib/data";
import {
  ProductsCategories,
  PopularProductsSection,
} from "../components/homeTwo";
import DiscountedProducts from "../components/common/DiscountedProducts";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeTwo = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Countdown timer state (24 hours in seconds)
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

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
      {/* Hero Banner */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {homeTwoHeroBanners.map((bannerProps, idx) => {
            // Translate banner texts
            let translatedDiscountText = bannerProps.discountText;

            // Handle JSX discountText for Samsung Galaxy Tab
            if (
              typeof bannerProps.discountText !== "string" &&
              bannerProps.discountText
            ) {
              // Check if it's the Samsung Tab description
              if (bannerProps.headline === "Samsung Galaxy Tab") {
                translatedDiscountText = (
                  <>
                    {t("common.samsungTabDescription")}
                    <br />
                    <span
                      style={{
                        display: "inline-block",
                        background: "#FFD600",
                        color: "#212844",
                        borderRadius: 8,
                        padding: "0 8px",
                        fontWeight: 700,
                        fontSize: 12,
                        marginLeft: isRTL ? 0 : 10,
                        marginRight: isRTL ? 10 : 0,
                      }}
                    >
                      -20% {t("common.off")}
                    </span>
                  </>
                );
              }
            } else if (typeof bannerProps.discountText === "string") {
              // Handle string discountText
              if (bannerProps.discountText === "For Portrait") {
                translatedDiscountText = t("common.forPortrait");
              } else if (
                bannerProps.discountText ===
                "Meta is the new name that replaces Oculus"
              ) {
                translatedDiscountText = t("common.metaQuestDescription");
              }
            }

            const translatedProps = {
              ...bannerProps,
              eyebrowText:
                bannerProps.eyebrowText === "Starting At Only $699"
                  ? `${t("common.startingAtOnly")} $699`
                  : bannerProps.eyebrowText === "New Arrival"
                  ? t("common.newArrival")
                  : bannerProps.eyebrowText === "Grab Offer"
                  ? t("common.grabOffer")
                  : bannerProps.eyebrowText,
              ctaText:
                bannerProps.ctaText === "Shop Now"
                  ? t("common.shopNow")
                  : bannerProps.ctaText,
              discountText: translatedDiscountText,
            };
            return (
              <div className="col-span-1" key={idx}>
                <HeroBanner {...translatedProps} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Categories Section */}
      <ProductsCategories />

      {/* banner section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
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

      {/* Discounted products section */}
      <DiscountedProducts timeLeft={timeLeft} />

      {/* Popular Products Section */}
      <PopularProductsSection />

      <Footer />
    </div>
  );
};

export default HomeTwo;
