import { useTranslation } from "react-i18next";
import ProductCard from "../common/ProductCard";

const ProductsWithSidebar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Electronics subcategories
  const electronicsSubcategories = [
    "categories.laptopsComputers",
    "categories.tabletsEReaders",
    "categories.wearableTechnology",
    "categories.audioHeadphones",
    "categories.camerasPhotography",
    "categories.tvHomeEntertainment",
    "categories.printersScanners",
    "categories.networkingDevices",
    "categories.portablePowerChargers",
    "categories.electronicToolsTest",
  ];

  // Generate 8 products
  const products = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    imageSrc: "/images/watchimg.png",
    title: t("product.defaultTitle"),
    description: t("product.defaultDescription"),
    price: 50.55,
    currency: "$",
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-4 ">
      <div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white p-6 rounded-xl"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Left Sidebar - Electronics & Technology */}
        <div
          className={`lg:col-span-1 bg-[#212844] text-white rounded-xl p-6 lg:p-8 relative overflow-hidden ${
            isRTL ? "order-2" : "order-1"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/images/bgbanner.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center h-full min-h-[420px]">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold mb-6">
                {t("categories.electronics")} & Technology
              </h2>
              <ul className="space-y-6">
                {electronicsSubcategories.map((subcategoryKey, index) => (
                  <li
                    key={index}
                    className="text-sm lg:text-base text-white/90 hover:text-white cursor-pointer transition-colors"
                  >
                    {t(subcategoryKey)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section - Product Grid */}
        <div className={`lg:col-span-3 ${isRTL ? "order-1" : "order-2"}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                imageSrc={product.imageSrc}
                title={product.title}
                description={product.description}
                price={product.price}
                currency={product.currency}
                showHoverActions={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsWithSidebar;
