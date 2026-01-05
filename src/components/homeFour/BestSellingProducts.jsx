import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "../common/ProductCard";

const BestSellingProducts = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [activeTab, setActiveTab] = useState("watches");

  const categories = [
    { key: "watches", labelKey: "categories.watches" },
    { key: "laptops", labelKey: "categories.laptopsComputers" },
    { key: "headphones", labelKey: "categories.audioHeadphones" },
  ];

  // Generate 10 products
  const products = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    imageSrc: "/images/watchimg.png",
    title: t("product.defaultTitle"),
    description: t("product.defaultDescription"),
    price: 50.55,
    currency: "$",
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 bg-background-light-gray">
      {/* Title */}
      <h2
        className={`text-2xl lg:text-3xl font-bold text-[#212844] mb-6 text-center`}
      >
        {t("common.bestSellingProducts")}
      </h2>

      {/* Category Tabs */}
      <div
        className={`flex justify-center gap-4 mb-8 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveTab(category.key)}
            className={`px-6 py-2 rounded-lg font-semibold text-sm lg:text-base transition-colors ${
              activeTab === category.key
                ? "bg-[#FC813B] text-white"
                : "bg-white text-[#212844] hover:bg-gray-100"
            }`}
          >
            {t(category.labelKey)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageSrc={product.imageSrc}
            title={product.title}
            description={product.description}
            price={product.price}
            currency={product.currency}
            showHoverActions={false}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
