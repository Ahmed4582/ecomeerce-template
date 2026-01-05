import { useTranslation } from "react-i18next";
import CartItem from "./CartItem";

const CartItemsList = ({ items, onQuantityChange, onRemoveItem }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className={`lg:col-span-9 ${
        isRTL ? "order-2" : "order-1"
      } space-y-4`}
    >
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemoveItem}
        />
      ))}
    </div>
  );
};

export default CartItemsList;

