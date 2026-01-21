import { useTranslation } from "react-i18next";

const Shop = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-background-light-gray min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="bg-background-white rounded-card shadow-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            {t("pages.shop", { defaultValue: "Shop" })}
          </h1>
          <p className="mt-3 text-text-secondary">
            {t("pages.comingSoon", { defaultValue: "Coming soon." })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;

