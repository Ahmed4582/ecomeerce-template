import { useTranslation } from "react-i18next";

const PopularProductsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Sample product data - will be translated in the component
  const productTemplate = {
    imageSrc: "/images/watchimg.png",
    titleKey: "product.defaultTitle",
    descriptionKey: "product.defaultDescription",
    price: 50.55,
    currency: "$",
  };

  // Generate arrays by repeating the template
  const popularProducts = Array.from({ length: 3 }, (_, i) => ({
    ...productTemplate,
    id: i + 1,
  }));

  const bestSellers = Array.from({ length: 3 }, (_, i) => ({
    ...productTemplate,
    id: i + 4,
  }));

  // Horizontal Product Card Component
  const HorizontalProductCard = ({ product }) => (
    <div
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Product Image */}
      <div
        className={`flex-shrink-0 w-full sm:w-32 md:w-40 h-32 sm:h-32 md:h-52 bg-background-light-gray rounded-lg flex items-center justify-center overflow-hidden ${
          isRTL ? "order-2" : "order-1"
        }`}
      >
        <img
          src={product.imageSrc}
          alt={product.title}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Product Info */}
      <div
        className={`flex-1 flex flex-col justify-between gap-2 p-4 ${
          isRTL ? "order-1 text-right" : "order-2 text-left"
        }`}
      >
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {product.titleKey ? t(product.titleKey) : product.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.descriptionKey
              ? t(product.descriptionKey)
              : product.description}
          </p>
        </div>

        {/* Price */}
        <span className="text-xl sm:text-2xl font-medium text-[#FC813B]">
          {product.price.toFixed(2)}
          {product.currency}
        </span>

        {/* Action Buttons */}
        <div className={`flex gap-2 sm:gap-3 ${isRTL ? "" : "justify-start"}`}>
          <button
            onClick={() => {}}
            className="px-4 sm:px-10 py-2 sm:py-2.5 bg-[#FC813B] text-white text-sm font-semibold rounded-lg hover:bg-[#e6733a] transition-colors shadow-sm"
          >
            {t("common.addToCart")}
          </button>
          <button
            onClick={() => {}}
            className="px-4 sm:px-16 py-2 sm:py-2.5 bg-white text-[#FC813B] border-2 border-[#FC813B] text-sm font-semibold rounded-lg hover:bg-orange-50 transition-colors"
          >
            {t("common.buy")}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background-light-gray px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 items-start">
        {/* Left Sidebar - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:block overflow-hidden col-span-1 mx-auto h-full">
          <img
            src="/images/techstore.png"
            alt="Tech Store"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Popular Product Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <h2
            className={`text-xl lg:text-2xl font-semibold text-[#212844] mb-6 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("common.popularProduct")}
          </h2>
          <div className="space-y-4">
            {popularProducts.map((product) => (
              <HorizontalProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Best Sellers Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <h2
            className={`text-xl lg:text-2xl font-semibold text-[#212844] mb-6 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("common.bestSellersThisWeek")}
          </h2>
          <div className="space-y-4">
            {bestSellers.map((product) => (
              <HorizontalProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProductsSection;
