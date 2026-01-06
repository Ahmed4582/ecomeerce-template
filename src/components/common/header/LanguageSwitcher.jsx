import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ variant = "light" }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage =
    i18n.language === "ar" ? t("language.arabic") : t("language.english");

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLanguageDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };

    if (showLanguageDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguageDropdown]);

  const isDark = variant === "dark";
  const textColor = isDark ? "text-text-white" : "text-text-primary";
  const hoverColor = isDark
    ? "hover:text-brand-primary"
    : "hover:text-brand-primary";
  const dropdownBg = isDark
    ? "bg-white border-white border-opacity-20"
    : "bg-white border-gray-200";
  const dropdownItemHover = isDark
    ? "hover:bg-white hover:bg-opacity-10"
    : "hover:bg-gray-100";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        className={`flex items-center gap-1 sm:gap-1.5 ${textColor} ${hoverColor} transition-colors text-xs sm:text-sm`}
        aria-label={t("common.languageSwitcher") || "Change language"}
      >
        <img
          src="/SVG/global.svg"
          alt="language"
          className="w-4 h-4 sm:w-5 sm:h-5"
          style={isDark ? { filter: "brightness(0) invert(1)" } : {}}
        />
        <span className={isDark ? "text-text-white" : ""}>
          {currentLanguage}
        </span>
        <img src="/SVG/arrow-down.svg" alt="arrow down" className="w-2 h-2" />
      </button>
      {showLanguageDropdown && (
        <div
          className={`absolute top-full ${
            isDark ? "right-0" : "right-0"
          } mt-1 ${dropdownBg} rounded shadow-lg z-50 min-w-[120px]`}
        >
          <button
            onClick={() => changeLanguage("en")}
            className={`block w-full text-left px-3 py-2 ${dropdownItemHover} transition-colors ${
              i18n.language === "en" ? "bg-gray-100" : ""
            }`}
          >
            {t("language.english")}
          </button>
          <button
            onClick={() => changeLanguage("ar")}
            className={`block w-full text-left px-3 py-2 ${dropdownItemHover} transition-colors ${
              i18n.language === "ar" ? "bg-gray-100" : ""
            }`}
          >
            {t("language.arabic")}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
