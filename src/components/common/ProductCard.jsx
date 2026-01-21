import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { resolveApiAssetUrl } from "../../utils";

export default function ProductCard({
  imageSrc,
  title,
  description,
  price = 50.55,
  oldPrice,
  discountPercent,
  currency = "$",

  clickable = true,
  onClick,

  showHoverActions = true,
  onAddToCart,
  onBuy,
}) {
  const { t } = useTranslation();

  const resolvedImageSrc = useMemo(() => {
    return (
      resolveApiAssetUrl(imageSrc, "ProdImg") ||
      "/images/watchimg.png"
    );
  }, [imageSrc]);

  const displayTitle = useMemo(
    () => title || t("product.defaultTitle"),
    [title, t]
  );

  const displayDescription = useMemo(
    () => description || t("product.defaultDescription"),
    [description, t]
  );

  const hasDiscount = useMemo(
    () => typeof discountPercent === "number" && discountPercent > 0,
    [discountPercent]
  );

  const handleCardClick = useCallback(() => {
    if (!clickable) return;
    onClick?.();
  }, [clickable, onClick]);

  const handleAddToCart = useCallback(
    (e) => {
      e?.stopPropagation?.();
      onAddToCart?.();
    },
    [onAddToCart]
  );

  const handleBuy = useCallback(
    (e) => {
      e?.stopPropagation?.();
      onBuy?.();
    },
    [onBuy]
  );

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (!clickable) return;
        if (e.key === "Enter" || e.key === " ") handleCardClick();
      }}
      className={`group relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm
        ${clickable ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
    >
      {hasDiscount && (
        <div className="absolute right-0 top-0 z-20 rounded-bl-2xl bg-red-500 px-5 py-2 text-sm font-semibold text-white">
          {discountPercent}%
        </div>
      )}

      <div className="relative h-[190px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={resolvedImageSrc}
            alt={displayTitle}
            className="h-[125px] w-auto object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
            draggable={false}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/images/watchimg.png";
            }}
          />
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none z-10"></div>

        {showHoverActions && (
          <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center gap-2 px-3 pb-3 opacity-0 translate-y-full transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-md bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-white shadow-lg border-2 border-[#ff7a00] min-w-[120px] transition-colors duration-200"
              aria-label={t("common.addToCart")}
            >
              {t("common.addToCart")}
            </button>
            <button
              type="button"
              onClick={handleBuy}
              className="rounded-md px-4 py-2 text-sm font-semibold text-[#ff7a00] shadow-lg border-2 border-[#ff7a00] min-w-[120px] transition-colors duration-200"
              aria-label={t("common.buy")}
            >
              {t("common.buy")}
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 px-5 py-4">
        <h3 className="text-base font-semibold text-gray-900">{displayTitle}</h3>

        <p className="mt-2 text-xs leading-5 text-gray-500">{displayDescription}</p>

        <div className="mt-3 flex items-center gap-3">
          {typeof oldPrice === "number" && (
            <span className="text-sm text-gray-400 line-through">
              {oldPrice.toFixed(2)}
              {currency}
            </span>
          )}

          {typeof price === "number" ? (
            <span className="text-sm font-semibold text-[#ff7a00]">
              {price.toFixed(2)}
              {currency}
            </span>
          ) : (
            <span className="text-sm font-semibold text-gray-500">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
