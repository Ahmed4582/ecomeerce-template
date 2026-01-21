import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {  OrderDetails } from "../components/profile";

const ProfileOrderDetail = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { orderId } = useParams();

  return (
    <div className="bg-background-light-gray min-h-screen">
      <div className="bg-[#FC813B] h-24"></div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div dir={isRTL ? "rtl" : "ltr"}>
          <OrderDetails orderId={orderId} />
        </div>
      </div>

      {/* Dark Gray Footer */}
      <div className="bg-[#2A2A2A] h-4"></div>
    </div>
  );
};

export default ProfileOrderDetail;
