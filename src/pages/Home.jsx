import HeroSection from "../components/homeOne/HeroSection";
import CategoriesSection from "../components/homeOne/CategoriesSection";
import ProductCard from "../components/common/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroBanner from "../components/common/HeroBanner";
import DiscountedProducts from "../components/common/DiscountedProducts";
import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/productsHooks";
import { useCart } from "../context";

const Home = () => {
  const API_BASE_URL = (process.env.REACT_APP_API_URL ||
    "https://apistore2.onpoint-teasting.com"
  ).replace(/\/$/, "");
  const PROD_IMG_BASE_URL = `${API_BASE_URL}/ProdImg`;
  const FALLBACK_PRODUCT_IMAGE = "/images/watchimg.png";
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCart();

  const { data, isLoading } = useProducts({
    PageNumber: 1,
    PageSize: 10,
  });
  const q = new URLSearchParams(location.search).get("q") || "";
  const filteredProducts = useMemo(() => {
    const products = Array.isArray(data?.products) ? data.products : [];
    const needle = q.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((p) => {
      const en = String(p.product_Name_En || "").toLowerCase();
      const ar = String(p.product_Name_Ar || "").toLowerCase();
      return en.includes(needle) || ar.includes(needle);
    });
  }, [data?.products, q]);
  const skeletonCount = 10;

  const handleAddToCart = (product) => {
    // If the product has variants, use the first one.
    // If not, fall back to a temporary variantId.
    const variant = product.variants?.[0];
    const variantId = variant?.variant_Id || `temp-${product.product_Id}`;

    addItem({
      productId: product.product_Id,
      variantId: variantId,
      name:
        i18n.language === "ar"
          ? product.product_Name_Ar
          : product.product_Name_En,
      price:
        typeof product.basic_Price === "number" ? product.basic_Price : 0,
      quantity: 1,
      image: product.base_Image
        ? `${PROD_IMG_BASE_URL}/${product.base_Image}`
        : FALLBACK_PRODUCT_IMAGE,
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 24 * 60 * 60; // Reset to 24 hours
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background-light-gray">
      <HeroSection />
      <CategoriesSection />

      {/* popular products section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <h2
          className="text-start"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
            fontSize: "25px",
            lineHeight: "120%",
            letterSpacing: "0%",
            marginBottom: "20px",
          }}
        >
          {t("common.popularProducts")}
        </h2>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={`popular-skeleton-${i}`}
                  className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse"
                >
                  <div className="h-[190px] bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))
            : filteredProducts.length === 0 ? (
              <div className="col-span-full text-text-secondary">
                {t("common.noResults", { defaultValue: "No results." })}
              </div>
            ) : (
              filteredProducts.map((product) => (
              <ProductCard
              key={product.product_Id}
              imageSrc={product.base_Image ? `${PROD_IMG_BASE_URL}/${product.base_Image}` : FALLBACK_PRODUCT_IMAGE}
              title={i18n.language === "ar"
                        ? product.product_Name_Ar
                        : product.product_Name_En}
              price={typeof product.basic_Price === "number"
                        ? product.basic_Price
                        : undefined}
              discountPercent={typeof product.discount_Percent === "number"
                        ? product.discount_Percent
                        : undefined}
              oldPrice={product.is_Discount &&
                      typeof product.basic_Price === "number" &&
                      typeof product.discount_Percent === "number" &&
                      product.discount_Percent > 0
                        ? product.basic_Price /
                          (1 - product.discount_Percent / 100)
                        : undefined}
              showHoverActions
              clickable={false}
              onBuy={() => navigate(`/product/${product.product_Id}`)}
              onAddToCart={() => handleAddToCart(product)}
            />
            
              ))
            )}
        </div>

        {/* Mobile/Tablet Swiper - Visible on small screens */}
        <div className="lg:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
            }}
            pagination={false}
            navigation={false}
            className="product-card-swiper"
          >
            {(isLoading
              ? Array.from({ length: skeletonCount }).map((_, i) => ({
                  product_Id: `popular-skeleton-${i}`,
                  __skeleton: true,
                }))
              : filteredProducts
            ).map((product) => (
              <SwiperSlide key={product.product_Id}>
                {"__skeleton" in product ? (
                  <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse">
                    <div className="h-[190px] bg-gray-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="h-5 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ) : (
                  <ProductCard
                  imageSrc={`${PROD_IMG_BASE_URL}/${product.base_Image}`}
                  title={i18n.language === "ar"
                        ? product.product_Name_Ar
                        : product.product_Name_En}
                  price={typeof product.basic_Price === "number"
                        ? product.basic_Price
                        : undefined}
                  discountPercent={typeof product.discount_Percent === "number"
                        ? product.discount_Percent
                        : undefined}
                  oldPrice={product.is_Discount &&
                      typeof product.basic_Price === "number" &&
                      typeof product.discount_Percent === "number" &&
                      product.discount_Percent > 0
                        ? product.basic_Price /
                          (1 - product.discount_Percent / 100)
                        : undefined}
                  showHoverActions
                  clickable={false}
                  onBuy={() => navigate(`/product/${product.product_Id}`)}
                  onAddToCart={() => handleAddToCart(product)}
                />
                
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-6 lg:mt-8">
          <HeroBanner
            backgroundImage="#212844"
            productImage="laptop.png"
            productAlt="laptop"
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
      </div>

      {/* discounted products section */}
      <DiscountedProducts timeLeft={timeLeft} />
    </div>
  );
};

export default Home;

