import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../../../context";
import LanguageSwitcher from "./LanguageSwitcher";
import { useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function isAdminRole(role) {
  return String(role || "").toLowerCase().includes("admin");
}

const MainHeader = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { items } = useCart();
  const cartItemCount = items.length;
  const { logout, user, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const role = user?.role;
  const showAdmin = !!isAuthenticated && isAdminRole(role);

  const userLabel = useMemo(() => {
    if (user?.user_Name) return user.user_Name;
    if (user?.email) return user.email;
    try {
      const raw = localStorage.getItem("auth");
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed?.user?.user_Name || parsed?.user?.email || "User";
    } catch {
      return "User";
    }
  }, [user]);

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
                const q = search.trim();
                navigate(q ? `/?q=${encodeURIComponent(q)}` : "/");
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
                  className={`w-full py-2.5 sm:py-3 lg:py-3.5 bg-[#f5f5f5] border border-input-border focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm sm:text-base text-text-primary placeholder:text-[#9b9b9b] ${
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
                className={`bg-brand-primary hover:bg-brand-primary-hover text-white px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-3.5 font-medium text-sm sm:text-base transition-colors whitespace-nowrap ${
                  isRTL ? "rounded-l-lg" : "rounded-r-lg"
                }`}
              >
                {t("common.search")}
              </button>
            </form>

            {/* User Actions */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-shrink-0">
              {/* Language Switcher */}
              <LanguageSwitcher variant="light" />
              {!isAuthenticated ? (
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
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className="flex items-center gap-2 hover:text-brand-primary transition-colors text-xs sm:text-sm lg:text-base"
                    aria-label="User menu"
                  >
                    <img
                      src="/SVG/user.svg"
                      alt="user"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <span className="hidden sm:inline max-w-[180px] truncate">
                      {userLabel}
                    </span>
                    <span className="text-text-secondary text-xs">▼</span>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-background-white rounded-xl shadow-card border border-border-light overflow-hidden z-50">
                      <Link
                        to="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-sm hover:bg-background-primary"
                      >
                        {t("profile.profile", { defaultValue: "Profile" })}
                      </Link>
                      {showAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-3 text-sm hover:bg-background-primary"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-background-primary"
                      >
                        {t("common.logout", { defaultValue: "Logout" })}
                      </button>
                    </div>
                  )}
                </div>
              )}
              <Link
                to="/cart"
                className="relative flex items-center gap-1.5 sm:gap-2 hover:text-brand-primary transition-colors text-xs sm:text-sm lg:text-base"
              >
                <div className="relative">
                  <img
                    src="/SVG/bag-2.svg"
                    alt="cart"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </div>
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
