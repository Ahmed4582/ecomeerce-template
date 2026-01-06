import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Hero, CategoriesGrid, ProductsWithSidebar } from "../components/homeThree";
import HeroBanner from "../components/common/HeroBanner";
import { useTranslation } from "react-i18next";
import { homeThreeHeroBanners } from "../lib/data";
const HomeThree = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <div className="bg-background-light-gray">
      <Header />
      <Hero />
      <CategoriesGrid />
      <ProductsWithSidebar />
      {/*  Banner */}
      <div className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {homeThreeHeroBanners.map((bannerProps, idx) => {
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
      <ProductsWithSidebar />
      <Footer />
    </div>
  );
};

export default HomeThree;
