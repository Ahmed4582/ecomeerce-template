import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroBanner = ({
  eyebrowText,
  headline,
  discountText,
  discountValue,
  discountLabel,
  discountTextColor,
  backgroundImage,
  productImage,
  productAlt,
  showCta,
  ctaText,
  onCtaClick,
  activeDot,
  totalDots,
  showVerticalBar = false,
  showPaginationBottom = false,
  showPaginationMiddle = false,
  showSpan = false,
  showP = false,
  verticalBarColor,
  showCtaTextParagraph = false,
  ctaBackgroundColor,
  ctaBorderRadius,
  eyebrowColor,
  headlineColor,
}) => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className="relative overflow-hidden rounded-[28px] shadow-card"
      style={{ backgroundColor: backgroundImage }}
    >
      <div className="relative w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
        <div className="absolute inset-0 w-full h-full" />

        <div
          className={`relative grid grid-cols-2 items-center gap-2 sm:gap-3 lg:gap-6  min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] w-full`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Content */}
          <div
            className={`flex flex-col justify-center p-3 sm:p-4 lg:p-8 xl:p-10 2xl:p-12 ${
              isRTL ? "order-1 text-right" : "order-1 text-left"
            }`}
          >
            {showCtaTextParagraph ? (
              <button
                className="bg-[#87d178] text-white px-4 py-1 rounded-[6px] text-[16px] font-normal"
                style={{
                  fontFamily: "Abel, sans-serif",
                  boxShadow: "none",
                }}
                type="button"
                onClick={onCtaClick}
              >
                {ctaText || t("common.grabOffer")}
              </button>
            ) : (
              <p
                className="mb-1 sm:mb-2 lg:mb-3"
                style={{
                  fontFamily: "Abel, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "clamp(10px, 2vw, 33.47px)",
                  lineHeight: "clamp(12px, 2.5vw, 33.47px)",
                  letterSpacing: "0%",
                  color: `${eyebrowColor}`,
                }}
              >
                {eyebrowText}
              </p>
            )}

            <h1
              className="mb-2 sm:mb-3 lg:mb-6"
              style={{
                fontFamily: "Abhaya Libre, serif",
                fontWeight: 700,
                fontStyle: "bold",
                fontSize: "clamp(16px, 4vw, 70.29px)",
                lineHeight: "clamp(20px, 4.5vw, 70.29px)",
                letterSpacing: "0%",
                color: `${headlineColor}`,
              }}
            >
              {headline}
            </h1>

            <div
              className={`flex items-center gap-1 sm:gap-2 lg:gap-3 mb-2 sm:mb-4 lg:mb-8 ${
                isRTL ? "justify-end flex-row-reverse" : "justify-start"
              }`}
            >
              {showVerticalBar && (
                <div
                  className={`w-[2px] h-8 sm:h-10 lg:h-12 xl:h-16 bg-[${verticalBarColor}]`}
                ></div>
              )}
              <div
                className={`flex items-center flex-col justify-center ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <p
                  style={{
                    fontFamily: "HK Grotesk, sans-serif",
                    fontWeight: 600,
                    fontStyle: "SemiBold",
                    fontSize: "clamp(10px, 2vw, 33.47px)",
                    lineHeight: "clamp(12px, 2.5vw, 33.47px)",
                    letterSpacing: "0%",
                    color: `${discountTextColor}`,
                  }}
                  className="space-nowrap"
                >
                  {discountText}{" "}
                  {showSpan && (
                    <span className="text-white font-extrabold">
                      {discountValue} <span>{discountLabel}</span>
                    </span>
                  )}
                  {showP && (
                    <p className="text-white font-extrabold">
                      {discountValue} <span>{discountLabel}</span>
                    </p>
                  )}
                </p>
              </div>
            </div>

            {showCta && (
              <div
                className={`flex mb-2 sm:mb-4 lg:mb-6 ${
                  isRTL ? "" : "justify-start"
                }`}
              >
                <button
                  onClick={onCtaClick}
                  className={`text-text-white px-3 sm:px-6 lg:px-10 xl:px-14 py-2 sm:py-3 lg:py-4 font-semibold text-[10px] sm:text-xs lg:text-base flex items-center gap-1 sm:gap-2 transition-colors ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                  style={{
                    backgroundColor: ctaBackgroundColor,
                    borderRadius: ctaBorderRadius,
                  }}
                >
                  {ctaText}
                  {isRTL ? <ArrowLeft /> : <ArrowRight />}
                </button>
              </div>
            )}

            {/* Vertical bar if showVerticalBar is true */}

            {/* Pagination Dots - if showPaginationBottom is true (bottom of hero) */}
            {showPaginationBottom && (
              <div
                className={`flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 lg:mt-8 ${
                  isRTL ? "" : "justify-start"
                }`}
              >
                {Array.from({ length: totalDots }).map((_, index) =>
                  index === activeDot ? (
                    <span
                      key={index}
                      className="h-1.5 w-4 sm:h-2 sm:w-6 lg:w-7 rounded-full bg-brand-primary"
                    />
                  ) : (
                    <span
                      key={index}
                      className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#656D86]"
                    />
                  )
                )}
              </div>
            )}

            {/* Pagination Dots - if showPaginationMiddle is true (middle, for page, centered) */}
            {showPaginationMiddle && (
              <div
                className={`flex items-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-8 ${
                  isRTL ? "" : "justify-start"
                }`}
              >
                {Array.from({ length: totalDots }).map((_, index) =>
                  index === activeDot ? (
                    <span
                      key={index}
                      className="h-3 w-3 rounded-full bg-[#FF8200]"
                    />
                  ) : (
                    <span
                      key={index}
                      className="h-3 w-3 rounded-full bg-[#656D86]"
                    />
                  )
                )}
              </div>
            )}
          </div>

          {/* Product Image */}
          <div
            className={`h-[150px] sm:h-[200px] lg:h-[350px] xl:h-[480px] flex items-center ${
              isRTL ? "order-1 justify-start" : "order-2 justify-end"
            } ${isRTL ? "ml-0" : "ml-auto"}`}
          >
            {productImage && (
              <img
                src={`/images/${productImage}`}
                alt={productAlt || "product"}
                className="h-full w-auto object-contain"
                style={{
                  maxWidth: "100%",
                }}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
