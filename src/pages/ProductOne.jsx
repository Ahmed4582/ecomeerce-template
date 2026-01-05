import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductCard from "../components/common/ProductCard";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const ProductOne = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Product images
  const productImages = [
    "/images/watchimg.png",
    "/images/watchimg.png",
    "/images/watchimg.png",
    
  ];

  // Available colors
  const colors = [
    { name: "Dark Blue", value: "#1e3a8a" },
    { name: "Dark Red", value: "#991b1b" },
    { name: "Dark Green", value: "#166534" },
    { name: "Black", value: "#000000" },
    { name: "Light Pink", value: "#fce7f3" },
    { name: "Light Purple", value: "#f3e8ff" },
    { name: "Light Gray", value: "#f3f4f6" },
  ];

  // Available sizes
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // Related products
  const relatedProducts = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    imageSrc: "/images/watchimg.png",
    title: t("product.defaultTitle"),
    description: t("product.defaultDescription"),
    price: 50.55,
    currency: "$",
  }));

  const currentPrice = 250.0;
  const originalPrice = 350.0;
  const discountPercent = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="bg-background-light-gray min-h-screen">
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Main Product Section */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Left Section: Product Images */}
          <div
            className={`lg:col-span-6 bg-white p-6 rounded-lg ${
              isRTL ? "order-2" : "order-1"
            } grid grid-cols-1 lg:grid-cols-12 gap-4`}
          >
            {/* Thumbnail Images - Desktop (Vertical Stack) */}
            <div
              className={`hidden lg:flex flex-col gap-4 lg:col-span-3 ${
                isRTL ? "order-2" : "order-1"
              }`}
            >
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-[#FC813B] ${
                    selectedImage === index
                      ? "border-[#FC813B] ring-2 ring-[#FC813B] ring-offset-2"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-100 p-2"
                  />
                </button>
              ))}
            </div>

            {/* Thumbnail Images - Mobile/Tablet (Horizontal) */}
            <div
              className={`lg:hidden flex gap-4 mb-4 overflow-x-auto pb-2 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-[#FC813B] ring-2 ring-[#FC813B]"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-contain bg-gray-100"
                  />
                </button>
              ))}
            </div>

            {/* Main Product Image */}
            <div
              className={`lg:col-span-9 ${
                isRTL ? "order-1" : "order-2"
              } flex items-center justify-center`}
            >
              <div className="w-full aspect-square max-w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={productImages[selectedImage]}
                  alt="Apple Watch Ultra 2"
                  className="w-full h-full object-contain p-4 lg:p-8"
                />
              </div>
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div
            className={`lg:col-span-6 ${
              isRTL ? "order-1 text-right" : "order-2 text-left"
            } flex flex-col justify-center`}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-[#212844] mb-4">
              Apple Watch Ultra 2
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl lg:text-3xl font-bold text-[#FC813B]">
                  ${currentPrice.toFixed(1)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${originalPrice.toFixed(1)}
                </span>
              </div>
              <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                {discountPercent}% {t("common.off")}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("product.appleWatchDescription")}
            </p>

            {/* Available Colors */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#212844] mb-3">
                {t("product.availableColors")}
              </h3>
              <div
                className={`flex gap-3 flex-wrap ${
                  isRTL ? "justify-end" : "justify-start"
                }`}
              >
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === index
                        ? "border-[#FC813B] scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Available Sizes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#212844] mb-3">
                {t("product.availableSizes")}
              </h3>
              <div
                className={`flex gap-2 flex-wrap ${
                  isRTL ? "justify-end" : "justify-start"
                }`}
              >
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? "border-[#FC813B] bg-[#FC813B] text-white"
                        : "border-gray-300 text-[#212844] hover:border-[#FC813B]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector and Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className={`p-3 transition-colors ${
                    quantity <= 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="w-16 text-center border-0 focus:outline-none bg-white"
                  min="0"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 bg-[#FC813B] text-white hover:bg-[#e6733a] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <button
                className={`flex-1 bg-[#FC813B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e6733a] transition-colors flex items-center justify-center gap-2 shadow-md ${
                  isRTL ? "sm:order-2" : ""
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {t("common.addToCart")}
              </button>
              <button
                className={`flex-1 bg-white text-[#FC813B] border-2 border-[#FC813B] px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors ${
                  isRTL ? "sm:order-1" : ""
                }`}
              >
                {t("common.buy")}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2
            className={`text-2xl lg:text-3xl font-bold text-[#212844] mb-6 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t("product.relatedProducts")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {relatedProducts.map((product) => (
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
      <Footer />
    </div>
  );
};

export default ProductOne;
