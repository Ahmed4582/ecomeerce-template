import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navigationLinks } from "../../../lib/data";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
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
  return (
    <>
            {/* Navigation Bar - Visible on large screens */}
            <div
              className="hidden lg:block bg-[#212844] border-b border-white/10"
              dir={isRTL ? "rtl" : "ltr"}
            >
        <div className="container mx-auto py-2.5 sm:py-3 lg:py-4">
          <div className="grid grid-cols-3 items-center">
            {/* Navigation Links */}
            <nav
              className={`col-span-2 flex flex-wrap items-center justify-center gap-16 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link}
                  to={
                    link === "Home"
                      ? "/"
                      : `/${link.toLowerCase().replace(" ", "-")}`
                  }
                  className="text-white/90 hover:text-white transition-colors text-md sm:text-lg font-medium"
                >
                  {t(getTranslationKey(link))}
                </Link>
              ))}
            </nav>

            {/* Customer Service */}
            <div
              className={`col-span-1 flex items-center gap-2 sm:gap-3 ${
                isRTL ? "justify-start" : "justify-end"
              }`}
            >
              <img
                src="/SVG/call-calling.svg"
                alt="phone"
                className="w-6 h-6"
                style={{
                  filter: "invert(1)",
                }}
              />
              <div className="flex flex-col leading-none">
                <span className="text-white/70 text-xs sm:text-sm leading-tight -mb-0.5">
                  {t('common.customerService')}
                </span>
                <a
                  href="tel:+963992165422"
                  className="text-[1.08rem] sm:text-base font-bold text-white hover:text-white/90 leading-tight"
                  style={{ fontFamily: "inherit" }}
                >
                  <span dir="ltr" style={{ unicodeBidi: "plaintext" }}>
                    (963) 99 216 5422
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
