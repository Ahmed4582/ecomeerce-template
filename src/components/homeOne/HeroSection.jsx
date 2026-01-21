import {
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
  Plus,
  Truck,
  Headset,
  Shield,
  RefreshCcw,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { features } from "../../lib/data";
import HeroBanner from "../common/HeroBanner";
import { useCategories } from "../../hooks/categoriesHooks";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;
  const categoriesQuery = useCategories({ pageNumber: 1, pageSize: 9 });
  const apiCategories = categoriesQuery.data?.categories || [];

  const handleViewMore = () => {
    const el = document.getElementById("categories-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      {/* Top Section: Sidebar + Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-6 mb-8 lg:mb-10">
        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block col-span-1">
          <div className="bg-background-white rounded-[28px] shadow-card p-5 xl:p-6">
            <div className="space-y-3">
              {categoriesQuery.isLoading ? (
                <div className="px-4 py-3 text-sm text-text-secondary">
                  {t("common.loading", { defaultValue: "Loading..." })}
                </div>
              ) : apiCategories.length === 0 ? (
                <div className="px-4 py-3 text-sm text-text-secondary">
                  {t("common.noDataFound", { defaultValue: "No data found" })}
                </div>
              ) : (
                apiCategories.map((category) => {
                  const name = isRTL
                    ? category.category_Name_Ar
                    : category.category_Name_Eng;
                  return (
                    <Link
                      key={category.category_Id}
                      to={`/category/${category.category_Id}`}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <LayoutGrid className="w-5 h-5 text-text-gray group-hover:text-brand-primary transition-colors flex-shrink-0" />
                      <span className="flex-1 text-sm text-text-primary font-medium">
                        {name || t("categories.categoryName")}
                      </span>
                      <ChevronIcon className="w-4 h-4 text-text-gray group-hover:text-brand-primary transition-colors flex-shrink-0" />
                    </Link>
                  );
                })
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-border-light">
              <button
                type="button"
                onClick={handleViewMore}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <Plus className="w-5 h-5 text-brand-primary flex-shrink-0" />
                <span className="flex-1 text-sm text-brand-primary font-medium">
                  {t("common.viewMoreCategories")}
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Hero Banner */}
        <div className="col-span-4">
          <HeroBanner
            showVerticalBar={true}
            showPaginationMiddle={true}
            backgroundImage="#212844"
            productImage="watch.png"
            productAlt="watch"
            eyebrowText={t("common.bestDeal")}
            headline={t("common.smartWearable")}
            headlineColor={"#FFFFFF"}
            eyebrowColor={"#FFFFFF7A"}
            discountTextColor={"#FFFFFF7A"}
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
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {features.map((feature, index) => {
          const IconComponent =
            feature.icon === "Truck"
              ? Truck
              : feature.icon === "Headset"
              ? Headset
              : feature.icon === "Shield"
              ? Shield
              : RefreshCcw;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 flex items-center p-6 gap-4 shadow-none min-h-[120px]"
              style={{
                boxShadow: "0 1px 3px 0 rgba(16, 24, 40, 0.03)",
              }}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#FFE4CF] flex items-center justify-center">
                <IconComponent className="w-7 h-7 text-[#FC813B]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#202232] mb-[2px]">
                  {t(
                    `hero.${
                      feature.icon === "Truck"
                        ? "freeShipping"
                        : feature.icon === "Headset"
                        ? "greatSupport"
                        : feature.icon === "Shield"
                        ? "securePayment"
                        : "returnPolicy"
                    }`
                  )}
                </h3>
                <p className="text-sm text-[#4B4B4B]">
                  {t(
                    `hero.${
                      feature.icon === "Truck"
                        ? "freeShippingDesc"
                        : feature.icon === "Headset"
                        ? "greatSupportDesc"
                        : feature.icon === "Shield"
                        ? "securePaymentDesc"
                        : "returnPolicyDesc"
                    }`
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
