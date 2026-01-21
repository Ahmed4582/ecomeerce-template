import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useUserDetails } from "../../hooks/usersHooks";

const ProfileInformation = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const userDetailsQuery = useUserDetails(!!user);
  const isRTL = i18n.language === "ar";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const details = userDetailsQuery.data ?? null;
    const detailsUser = details?.user ?? details?.User ?? details ?? null;

    const userNameFromAny =
      detailsUser?.user_Name ||
      detailsUser?.userName ||
      detailsUser?.name ||
      user?.user_Name ||
      user?.fullName ||
      user?.name ||
      (user?.email ? user.email.split("@")[0] : "") ||
      "";

    const emailFromAny = detailsUser?.email || user?.email || "";
    const addressFromAny =
      detailsUser?.address ||
      detailsUser?.shipping_Address ||
      detailsUser?.shippingAddress ||
      user?.address ||
      user?.shipping_Address ||
      user?.shippingAddress ||
      "";

    setFormData((prev) => ({
      ...prev,
      userName: userNameFromAny,
      email: emailFromAny,
      address: addressFromAny,
    }));
  }, [user, userDetailsQuery.data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 min-h-[710px]">
      {/* Header */}
      <div
        className={`flex justify-between items-center mb-6 border-b border-gray-200 pb-5 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#212844]">
          {t("profile.profileInformation", { defaultValue: "Profile Information" })}
        </h2>
        {isEditing ? (
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#FC813B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e6733a] transition-colors"
          >
            {t("profile.save", { defaultValue: "Save" })}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-[#FC813B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e6733a] transition-colors"
          >
            {t("profile.edit", { defaultValue: "Edit" })}
          </button>
        )}
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        {isEditing ? (
          <>
            {/* User Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("profile.userName", { defaultValue: "User Name" })}
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                  placeholder={t("profile.userNamePlaceholder", {
                    defaultValue: "Enter your user name",
                  })}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("profile.email", { defaultValue: "Email" })}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                  placeholder={t("profile.emailPlaceholder", {
                    defaultValue: "Enter your email",
                  })}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("profile.address", { defaultValue: "Address" })}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                placeholder={t("profile.addressPlaceholder", {
                  defaultValue: "Enter your address",
                })}
              />
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {/* User Name and Email side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-base text-[#212844]">
                <span className="font-medium">
                  {t("profile.userName", { defaultValue: "User Name" })} :{" "}
                </span>
                <span className="text-gray-500 font-normal">
                  {formData.userName || "—"}
                </span>
              </div>
              <div className="text-base text-[#212844]">
                <span className="font-medium">
                  {t("profile.email", { defaultValue: "Email" })} :{" "}
                </span>
                <span className="text-gray-500 font-normal">
                  {formData.email || "—"}
                </span>
              </div>
              {/* Address on separate line */}
              <div className="text-base text-[#212844]">
                <span className="font-medium">
                  {t("profile.address", { defaultValue: "Address" })} :{" "}
                </span>
                <span className="text-gray-500 font-normal">
                  {formData.address || "—"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInformation;
