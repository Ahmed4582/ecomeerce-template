import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TopBar, MainHeader, Navbar } from "./header/index";
import { navigationLinks } from "../../lib/data";

const Header = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();
  
  const getTranslationKey = (link) => {
    const keyMap = {
      "Home": "header.home",
      "Shop": "header.shop",
      "Pages": "header.pages",
      "Blogs": "header.blogs",
      "About us": "header.aboutUs",
      "Contact us": "header.contactUs",
    };
    return keyMap[link] || link;
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      <TopBar />
      <MainHeader />

      {/* Search Bar with Menu Button - Visible on small screens only */}
      <div className="lg:hidden bg-background-white border-b border-border-light">
        <div className="container mx-auto px-3 py-2.5 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-brand-primary hover:bg-brand-primary-hover text-white p-2.5 sm:p-3 rounded-lg flex-shrink-0 transition-colors"
            >
              {isMenuOpen ? (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              )}
            </button>

            {/* Search Bar */}
            <form 
              className="flex flex-1 gap-0"
              onSubmit={(e) => {
                e.preventDefault();
                const q = search.trim();
                navigate(q ? `/?q=${encodeURIComponent(q)}` : "/");
                setIsMenuOpen(false);
              }}
            >
              {/* Search Input */}
              <div className="flex-1 relative">
                <img
                  src="/SVG/search-normal.svg"
                  alt="search"
                  className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 opacity-30 ${
                    isRTL ? "right-3 sm:right-4" : "left-3 sm:left-4"
                  }`}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("common.searchPlaceholder")}
                  className={`w-full py-2.5 sm:py-3 bg-[#f5f5f5] border border-input-border focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm sm:text-base text-text-primary placeholder:text-[#9b9b9b] ${
                    isRTL
                      ? "pr-10 sm:pr-12 pl-10 sm:pl-12 rounded-r-lg text-right"
                      : "pl-10 sm:pl-12 pr-10 sm:pr-12 rounded-l-lg text-left"
                  }`}
                />
                {!!search.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      navigate("/");
                    }}
                    className={`absolute top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-black/5 text-text-secondary flex items-center justify-center ${
                      isRTL ? "left-2 sm:left-3" : "right-2 sm:right-3"
                    }`}
                    aria-label={t("common.clear", { defaultValue: "Clear" })}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 6L6 18M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {/* Search Button */}
              <button
                type="submit"
                className={`bg-brand-primary hover:bg-brand-primary-hover text-white px-6 sm:px-8 py-2.5 sm:py-3 font-medium text-sm sm:text-base transition-colors whitespace-nowrap ${
                  isRTL ? "rounded-l-lg" : "rounded-r-lg"
                }`}
              >
                {t("common.search")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Menu Dropdown - Visible on small screens when menu is open */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background-white border-b border-border-light shadow-lg">
          <div className="container mx-auto px-3 py-4">
            <div className="flex flex-col gap-4 bg-background-light-gray rounded-lg p-4">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-3">
                {navigationLinks.map((link) => (
                  <Link
                    key={link}
                    to={
                      link === "Home"
                        ? "/"
                        : `/${link.toLowerCase().replace(" ", "-")}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    className="text-text-primary hover:text-brand-primary transition-colors text-base font-medium py-2"
                  >
                    {t(getTranslationKey(link))}
                  </Link>
                ))}
              </nav>

              {/* Customer Service */}
              <div className="flex items-center gap-3 pt-3 border-t border-border-light">
                <img
                  src="/SVG/call-calling.svg"
                  alt="phone"
                  className="w-6 h-6"
                  style={{
                    filter:
                      "invert(56%) sepia(89%) saturate(1516%) hue-rotate(351deg) brightness(101%) contrast(103%)",
                  }}
                />
                <div className="flex flex-col leading-none">
                  <span className="text-[#b0b0b0] text-sm leading-tight -mb-0.5">
                    {t('common.customerService')}
                  </span>
                  <a
                    href="tel:+963992165422"
                    className="text-base font-bold text-[#222] hover:text-brand-primary leading-tight"
                    style={{ fontFamily: "inherit" }}
                  >
                    (963)99 216 5422
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navbar />
    </header>
  );
};

export default Header;
