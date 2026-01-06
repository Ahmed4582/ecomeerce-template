import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProfileInformation = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "user name",
    email: "user@gmail.com",
    phone: "+963 4563 2548 52",
  });

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
          {t("profile.profileInformation")}
        </h2>
        {isEditing ? (
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#FC813B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e6733a] transition-colors"
          >
            {t("profile.save")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-[#FC813B] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e6733a] transition-colors"
          >
            {t("profile.edit")}
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
                  {t("profile.userName")}
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                  placeholder={t("profile.userNamePlaceholder")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("profile.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                  placeholder={t("profile.emailPlaceholder")}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("profile.phone")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FC813B] text-sm sm:text-base bg-white"
                placeholder={t("profile.phonePlaceholder")}
              />
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {/* User Name and Email side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-base text-[#212844]">
                <span className="font-medium">{t("profile.userName")} : </span>
                <span className="text-gray-500 font-normal">
                  {formData.userName}
                </span>
              </div>
              <div className="text-base text-[#212844]">
                <span className="font-medium">{t("profile.email")} : </span>
                <span className="text-gray-500 font-normal">
                  {formData.email}
                </span>
              </div>
              {/* Phone on separate line */}
              <div className="text-base text-[#212844]">
                <span className="font-medium">{t("profile.phone")} : </span>
                <span className="text-gray-500 font-normal">
                  {formData.phone}
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
