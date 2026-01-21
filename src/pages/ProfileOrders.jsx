import { useTranslation } from "react-i18next";
import { ProfileSidebar, MyOrders } from "../components/profile";

const ProfileOrders = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="bg-background-light-gray min-h-screen">
      {/* Orange Header */}
    
      
      <div className="bg-[#FC813B] h-24"></div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Left Sidebar */}
          <div
            className={`lg:col-span-4 ${
              isRTL ? "order-2 lg:order-1" : "order-1"
            }`}
          >
            <ProfileSidebar />
          </div>

          {/* Right Content */}
          <div
            className={`lg:col-span-8 ${
              isRTL ? "order-1 lg:order-2" : "order-2"
            }`}
          >
            <MyOrders />
          </div>
        </div>
      </div>


      
    </div>
  );
};

export default ProfileOrders;

