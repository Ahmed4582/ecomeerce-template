export const socialLogin = [
  {
    name: "Facebook",
    icon: "/SVG/facebook_ic.svg",
    aria: "Login with Facebook",
  },
  {
    name: "Google",
    icon: "/SVG/google_ic.svg",
    aria: "Login with Google",
  },
  {
    name: "Apple",
    icon: "/SVG/cib_apple.svg",
    aria: "Login with Apple",
  },
];

export const navigationLinks = [
  "Home",
  "Shop",
  "Pages",
  "Blogs",
  "About us",
  "Contact us",
];

// Footer Data
export const footerPages = [
  "Home it work",
  "Pricing",
  "Blog",
  "Demo",
];

export const footerServices = [
  "Shopify",
  "WordPress",
  "UI/UX Design",
];

export const footerContact = {
  phone: "(406) 555-0120",
  email: "mangcoding123@gmail.com",
  address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
};

export const socialMediaLinks = [
  { name: "Facebook", icon: "facebook" },
  { name: "Twitter", icon: "twitter" },
  { name: "LinkedIn", icon: "linkedin" },
  { name: "Instagram", icon: "instagram" },
];

// Hero Section Data
export const categories = [
  { key: "electronics", hasChevron: true },
  { key: "categoryName", hasChevron: false },
  { key: "homeLights", hasChevron: true },
  { key: "categoryName", hasChevron: true },
  { key: "cosmetics", hasChevron: false },
  { key: "furniture", hasChevron: true },
  { key: "categoryName", hasChevron: true },
  { key: "categoryName", hasChevron: false },
  { key: "categoryName", hasChevron: false },
];

export const features = [
  {
    icon: "Truck",
    title: "Free Shipping",
    description: "Free Shipping with discount",
  },
  {
    icon: "Headset",
    title: "Great Support 24/7",
    description: "Instant access to Contact",
  },
  {
    icon: "Shield",
    title: "100% Sucure Payment",
    description: "We ensure your money is save",
  },
  {
    icon: "RefreshCcw",
    title: "Return Policy",
    description: "Includes return of goods",
  },
];

// Categories Data
export const categoryCards = [
  {
    id: 1,
    name: "Electronics & Technology",
    productsCount: 24,
    image: "/images/electronics.png",
    icon: "Monitor",
  },
  {
    id: 2,
    name: "Electronics & Technology",
    productsCount: 24,
    image: "/images/electronics.png",
    icon: "Monitor",
  },
  {
    id: 3,
    name: "Electronics & Technology",
    productsCount: 24,
    image: "/images/cosmetics.png",
    icon: "Monitor",
  },
  {
    id: 4,
    name: "Electronics & Technology",
    productsCount: 24,
    image: "/images/furniture.png",
    icon: "Monitor",
  },
  {
    id: 5,
    name: "Electronics & Technology",
    productsCount: 24,
    image: "/images/cosmetics.png",
    icon: "Monitor",
  },
  {
    id: 6,
    name: "Electronics & Technology",
    productsCount: 24,
    image: "/images/cosmetics.png",
    icon: "Monitor",
  },
  {
    id: 7,
    name: "Electronics & Technology",
    productsCount: 24,
    image: "/images/furniture.png",
    icon: "Monitor",
  },
  {
    id: 8,
    name: "Electronics & Technology",
    productsCount: 24,
    image: "/images/electronics.png",
    icon: "Monitor",
  },
];

// Hero Banners Data
export const heroBanners = [
  {
    id: 1,
    eyebrowText: "Best Deal Online on smart watches",
    headline: "SMART WEARABLE",
    discountText: "SALE UP TO",
    discountValue: "48%",
    discountLabel: "OFF",
    backgroundImage: "/images/imgbanner.png",
    activeDot: 0,
    totalDots: 3,
  },
  {
    id: 2,
    eyebrowText: "Best Deal Online on smart watches",
    headline: "SMART WEARABLE",
    discountText: "UP to",
    discountValue: "80%",
    discountLabel: "OFF",
    backgroundImage: "/images/imgbanner.png",
    activeDot: 0,
    totalDots: 6,
  },
];

export  const homeTwoHeroBanners = [
  {
    backgroundImage: "#E6ECFF",
    showPaginationMiddle: true,
    productImage: "meta-quest-2.jpg",
    productAlt: "Meta Quest 2",
    eyebrowText: "Starting At Only $699",
    headline: "Meta Quest 2",
    showCta: true,
    ctaText: "Shop Now",
    onCtaClick: () => {},
    discountText: "Meta is the new name that replaces Oculus",
    discountTextColor: "#212844",
    ctaBackgroundColor: "#212844",
    ctaBorderRadius: "10px",
    totalDots: 4,
    activeDot: 0,
  },
  {
    backgroundImage: "#FFF9E3",
    showPaginationMiddle: true,
    productImage: "fujifilm.webp",
    productAlt: "Fujifilm Instant Camera",
    eyebrowText: "New Arrival",
    headline: "Fujifilm Instant Camera",
    showCta: true,
    ctaText: "Shop Now",
    onCtaClick: () => {},
    discountText: "For Portrait",
    discountTextColor: "#B98B0A",
    ctaBackgroundColor: "#212844",
    ctaBorderRadius: "10px",
    totalDots: 4,
    activeDot: 1,
  },
  {
    backgroundImage: "#F1FAEB",
    showPaginationMiddle: true,
    productImage: "apple-watch-pro.jpg",
    productAlt: "Apple Smart Watch Pro",
    eyebrowText: "Grab Offer",
    headline: "Apple Smart Watch Pro",
    showCta: true,
    ctaText: "Shop Now",
    onCtaClick: () => {},
    discountText: (
      <>
        <span style={{ color: "#18753C", fontWeight: 600 }}>$53.99 </span>
        <span style={{ color: "#8D94A0", textDecoration: "line-through" }}>
          $69.99
        </span>
      </>
    ),
    discountTextColor: "#212844",
    ctaBackgroundColor: "#18753C",
    ctaBorderRadius: "10px",
    totalDots: 4,
    activeDot: 2,
  },
  {
    backgroundImage: "#E6ECFF",
    showPaginationMiddle: true,
    productImage: "galaxy-tab-a8.jpg",
    productAlt: "Samsung Galaxy Tab A8",
    eyebrowText: "Starting At Only $699",
    headline: "Samsung Galaxy Tab",
    showCta: true,
    ctaText: "Shop Now",
    onCtaClick: () => {},
    discountText: (
      <>
        The Samsung Galaxy Tab A8
        <br />
        64GB WiFi Gray is a mid-range tablet.
        <span
          style={{
            display: "inline-block",
            background: "#FFD600",
            color: "#212844",
            borderRadius: 8,
            padding: "0 8px",
            fontWeight: 700,
            fontSize: 12,
            marginLeft: 10,
          }}
        >
          -20% OFF
        </span>
      </>
    ),
    discountTextColor: "#212844",
    ctaBackgroundColor: "#212844",
    ctaBorderRadius: "10px",
    totalDots: 4,
    activeDot: 3,
  },
];

export  const homeThreeHeroBanners = [
  {
    backgroundImage: "#E6ECFF",
    showPaginationMiddle: true,
    productImage: "galaxy-tab-a8.jpg",
    productAlt: "Samsung Galaxy Tab A8",
    eyebrowText: "Starting At Only $699",
    headline: "Samsung Galaxy Tab",
    showCta: true,
    ctaText: "Shop Now",
    onCtaClick: () => {},
    discountText: (
      <>
        The Samsung Galaxy Tab A8
        <br />
        64GB WiFi Gray is a mid-range tablet.
        <span
          style={{
            display: "inline-block",
            background: "#FFD600",
            color: "#212844",
            borderRadius: 8,
            padding: "0 8px",
            fontWeight: 700,
            fontSize: 12,
            marginLeft: 10,
          }}
        >
          -20% OFF
        </span>
      </>
    ),
    discountTextColor: "#212844",
    ctaBackgroundColor: "#212844",
    ctaBorderRadius: "10px",
    totalDots: 4,
    activeDot: 3,
  },
  {
    backgroundImage: "#F1FAEB",
    showPaginationMiddle: true,
    productImage: "apple-watch-pro.jpg",
    productAlt: "Apple Smart Watch Pro",
    eyebrowText: "Grab Offer",
    headline: "Apple Smart Watch Pro",
    showCta: true,
    ctaText: "Shop Now",
    onCtaClick: () => {},
    discountText: (
      <>
        <span style={{ color: "#18753C", fontWeight: 600 }}>$53.99 </span>
        <span style={{ color: "#8D94A0", textDecoration: "line-through" }}>
          $69.99
        </span>
      </>
    ),
    discountTextColor: "#212844",
    ctaBackgroundColor: "#18753C",
    ctaBorderRadius: "10px",
    totalDots: 4,
    activeDot: 2,
  },

];