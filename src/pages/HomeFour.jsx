import { useTranslation } from "react-i18next";
import HeroBanner from "../components/common/HeroBanner";
import CategoriesSection from "../components/homeOne/CategoriesSection";
import BestSellingProducts from "../components/homeFour/BestSellingProducts";
const HomeFour = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-background-light-gray">
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <HeroBanner
          showVerticalBar={true}
          verticalBarColor="#FC813B"
          showPaginationMiddle={true}
          backgroundImage="#4ccee9"
          productImage="watchhand.jpg"
          productAlt="watch"
          eyebrowText={t("common.bestDeal")}
          headline={t("common.smartWearable")}
          headlineColor="#FFFFFF"
          eyebrowColor="#FFFFFF7A"
          discountTextColor="#FFFFFF7A"
          discountText={t("common.saleUpTo")}
          discountValue="48%"
          discountLabel={t("common.off")}
          showCta={true}
          ctaBackgroundColor="#f37622"
          ctaBorderRadius="44px"
          ctaText={t("common.shopNow")}
          onCtaClick={() => {}}
          activeDot={0}
          totalDots={6}
          showP={true}
        />
      </div>
      <CategoriesSection />
      <BestSellingProducts />
    </div>
  );
};

export default HomeFour;
