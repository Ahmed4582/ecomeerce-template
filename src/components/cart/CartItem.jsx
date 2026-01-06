import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
      <div className="flex flex-row sm:flex-row gap-3 sm:gap-4 md:gap-6 flex-1 items-center">
        {/* Product Image */}
        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-1 sm:p-2"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div
          className={`flex-1 ${
            isRTL ? "text-right" : "text-left"
          } flex flex-col gap-1 min-w-0`}
        >
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#212844] truncate">
            {item.name}
          </h3>
          <div className="text-xs sm:text-lg text-black">
            <p>
              {t("cart.color")} : <span className="text-gray-400 font-semibold text-xs sm:text-sm md:text-base">{item.color}</span>
            </p>
            <p>
              {t("cart.size")} : <span className="text-gray-400 font-semibold text-xs sm:text-sm md:text-base">{item.size}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Quantity, Price, Remove */}
      <div className="flex flex-row sm:flex-row items-center justify-between sm:justify-end gap-2 sm:gap-4 md:gap-10">
        {/* Quantity Selector */}
        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => onQuantityChange(item.id, -1)}
            disabled={item.quantity <= 1}
            className={`p-1.5 sm:p-2 transition-colors ${
              item.quantity <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label={t("cart.decreaseQuantity") || "Decrease quantity"}
          >
            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => {
              const newQty = Math.max(1, parseInt(e.target.value) || 1);
              onQuantityChange(item.id, newQty - item.quantity);
            }}
            className="w-10 sm:w-12 md:w-16 text-center border-0 focus:outline-none bg-white text-xs sm:text-sm md:text-base"
            min="1"
          />
          <button
            onClick={() => onQuantityChange(item.id, 1)}
            className="p-1.5 sm:p-2 bg-[#FC813B] text-white hover:bg-[#e6733a] transition-colors"
            aria-label={t("cart.increaseQuantity") || "Increase quantity"}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Price Info */}
        <div className="flex flex-row gap-8 min-w-[220px] justify-between items-center">
          <div className="flex flex-col items-start">
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-1">
              {t("cart.individualPrice")}
            </p>
            <p className="text-xl font-normal text-[#FC813B]">
              ${item.individualPrice.toFixed(1)}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-1">
              {t("cart.totalPrice")}
            </p>
            <p className="text-xl font-normal text-[#FC813B]">
              ${(item.individualPrice * item.quantity).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors p-1.5 sm:p-2"
          aria-label={t("cart.removeItem")}
        >
          <Trash2 className="w-4 h-4 sm:w-8 sm:h-8" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

