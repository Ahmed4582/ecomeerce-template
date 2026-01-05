import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navigationLinks } from "../../../lib/data";

const Navbar = () => {
  const { t } = useTranslation();
  
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
            <div className="hidden lg:block bg-background-white border-b border-border-light">
        <div className="container mx-auto py-2.5 sm:py-3 lg:py-4">
          <div className="grid grid-cols-3 items-center justify-items-center">
            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center sm:justify-start items-center space-x-16 col-span-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link}
                  to={
                    link === "Home"
                      ? "/"
                      : `/${link.toLowerCase().replace(" ", "-")}`
                  }
                  className="text-text-primary hover:text-brand-primary transition-colors text-md sm:text-lg font-medium"
                >
                  {t(getTranslationKey(link))}
                </Link>
              ))}
            </nav>

            {/* Customer Service */}
            <div className="flex items-center gap-2 sm:gap-3 col-span-1">
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
                <span className="text-[#b0b0b0] text-xs sm:text-sm leading-tight -mb-0.5">
                  {t('common.customerService')}
                </span>
                <a
                  href="tel:+963992165422"
                  className="text-[1.08rem] sm:text-base font-bold text-[#222] hover:text-brand-primary leading-tight"
                  style={{ fontFamily: "inherit" }}
                >
                  (963)99 216 5422
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
