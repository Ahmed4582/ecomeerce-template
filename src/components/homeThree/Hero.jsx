import HeroBanner from "../common/HeroBanner";
import { useTranslation } from "react-i18next";
import { features } from "../../lib/data";
import { Truck, Headset, Shield, RefreshCcw } from "lucide-react";
const Hero = () => {
  const { t } = useTranslation();
  return (
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
      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-6 lg:mt-8">
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

export default Hero;
