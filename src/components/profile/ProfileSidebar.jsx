import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { User, ShoppingBag, Camera } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context";

const ProfileSidebar = () => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      {
        id: "personal-info",
        label: t("profile.personalInformation"),
        icon: User,
        path: "/profile",
      },
      {
        id: "my-orders",
        label: t("profile.myOrders"),
        icon: ShoppingBag,
        path: "/profile/orders",
      },
    ],
    [t]
  );

  const isActive = useCallback(
    (path) => {
      if (path === "/profile") {
        return location.pathname === "/profile";
      }
      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

  return (
    <div
      className={`bg-white rounded-lg p-6 w-full min-h-[810px] mt-[-100px] ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* User Profile Section */}
      <div className="mb-8">
        <div className="space-y-5 border-b border-gray-200 pb-5">
          <div className="flex justify-center items-center">
            <div className="relative inline-block mx-auto">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/images/man.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover "
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#FC813B] rounded-full flex items-center justify-center hover:bg-[#e6733a] transition-colors shadow-sm"
                aria-label={t("profile.edit") || "Edit profile picture"}
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          <div className=" text-center">
            <h3 className="text-lg font-bold text-[#212844] ">
              {user?.fullName || user?.name || t("profile.userName")}
            </h3>
            <p className="text-sm text-gray-600">{user?.email || t("profile.emailPlaceholder")}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!active && location.pathname !== item.path) {
                  navigate(item.path);
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "text-[#FC813B] bg-transparent"
                  : "text-[#212844] hover:bg-gray-100"
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  active ? "text-[#FC813B]" : "text-gray-600"
                }`}
                strokeWidth={active ? 2 : 1.5}
              />
              <span className={`font-medium ${active ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSidebar;
