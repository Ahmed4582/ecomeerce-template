import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCardSwiper = ({
  products = [],
  showNavigation = false,
  showPagination = false,
  spaceBetween = 16,
  breakpoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={1.2}
      breakpoints={breakpoints}
      pagination={showPagination ? { clickable: true } : false}
      navigation={showNavigation}
      className="product-card-swiper"
    >
      {products.map((product, index) => (
        <SwiperSlide key={product.id || index}>
          <ProductCard {...product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCardSwiper;
