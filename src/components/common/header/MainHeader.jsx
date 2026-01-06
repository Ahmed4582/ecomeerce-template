import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const MainHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Main Header - White */}
      <div className="bg-background-white border-b border-border-light">
        <div className="container mx-auto p-3">
          <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-16">
            {/* Logo/Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            >
              <img
                src="/SVG/logo.svg"
                alt="logo"
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
              <span className="text-brand-primary text-xl font-bold">
                {t("header.slogan")}
              </span>
            </Link>
            {/* Search Bar */}
            <form
              className="hidden lg:flex flex-1 gap-0"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle search logic here
              }}
            >
              {/* Search Input */}
              <div className="flex-1 relative">
                <img
                  src="/SVG/search-normal.svg"
                  alt="search"
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 opacity-30"
                />
                <input
                  type="text"
                  placeholder={t("common.searchPlaceholder")}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 lg:py-3.5 bg-[#f5f5f5] border border-input-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm sm:text-base text-[#9b9b9b]"
                />
              </div>
              {/* Search Button */}
              <button
                type="submit"
                className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-3.5 rounded-r-lg font-medium text-sm sm:text-base transition-colors whitespace-nowrap"
              >
                {t("common.search")}
              </button>
            </form>

            {/* User Actions */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-shrink-0">
              {/* Language Switcher */}
              <LanguageSwitcher variant="light" />
              <Link
                to="/login"
                className="flex items-center gap-1.5 sm:gap-2 hover:text-brand-primary transition-colors text-xs sm:text-sm lg:text-base"
              >
                <img
                  src="/SVG/user.svg"
                  alt="user"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="hidden sm:inline">
                  {t("common.loginSignUp")}
                </span>
                <span className="sm:hidden">{t("common.login")}</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-1.5 sm:gap-2 hover:text-brand-primary transition-colors text-xs sm:text-sm lg:text-base"
              >
                <img
                  src="/SVG/bag-2.svg"
                  alt="cart"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span className="hidden sm:inline">{t("common.myCart")}</span>
                <span className="sm:hidden">{t("common.cart")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
