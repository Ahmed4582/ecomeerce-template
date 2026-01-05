import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  footerPages,
  footerServices,
  socialMediaLinks,
  footerContact,
} from "../../../lib/data";

const DesktopFooter = () => {
  const { t } = useTranslation();
  
  const getFooterPageTranslation = (page) => {
    const pageMap = {
      "Home it work": "footer.homeItWork",
      "Pricing": "footer.pricing",
      "Blog": "footer.blog",
      "Demo": "footer.demo",
    };
    return pageMap[page] || page;
  };
  
  const getFooterServiceTranslation = (service) => {
    const serviceMap = {
      "Shopify": "footer.shopify",
      "WordPress": "footer.wordpress",
      "UI/UX Design": "footer.uiUxDesign",
    };
    return serviceMap[service] || service;
  };
  return (
    <>
          <div className="hidden md:grid md:grid-cols-8 lg:grid-cols-8 gap-8 sm:gap-10 lg:gap-12">
          {/* App Download Section */}
          <div className="w-full overflow-hidden md:col-span-2 lg:col-span-2">
            <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-6">
              <img
                src="/SVG/logo-footer.svg"
                alt="logo"
                className="w-16 h-16 sm:w-20 sm:h-20 mb-4 flex-shrink-0"
              />
              <p className="text-text-white font-normal text-xs mb-4 sm:mb-6 text-center sm:text-left w-full">
                {t('footer.downloadApp')}
              </p>
              <div className="flex flex-col 2xl:flex-row gap-3">
                <img
                  src="/SVG/googleplay.svg"
                  alt="Google Play"
                  className="w-full sm:w-auto max-w-[140px] sm:max-w-[160px] cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/SVG/appstore.svg"
                  alt="App Store"
                  className="w-full sm:w-auto max-w-[140px] sm:max-w-[160px] cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Pages Section */}
          <div className="w-full overflow-hidden md:col-span-1 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 lg:mb-8">
              {t('footer.pages')}
            </h3>
            <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
              {footerPages.map((page) => (
                <li key={page} className="w-full">
                  <Link
                    to="#"
                    className="text-text-white hover:text-brand-primary transition-colors text-sm sm:text-base block w-full break-words"
                  >
                    {t(getFooterPageTranslation(page))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Section */}
          <div className="w-full overflow-hidden md:col-span-1 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 lg:mb-8">
              {t('footer.service')}
            </h3>
            <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
              {footerServices.map((service) => (
                <li key={service} className="w-full">
                  <Link
                    to="#"
                    className="text-text-white hover:text-brand-primary transition-colors text-sm sm:text-base block w-full break-words"
                  >
                    {t(getFooterServiceTranslation(service))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full overflow-hidden md:col-span-2 lg:col-span-2">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 lg:mb-8">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 sm:space-y-4 lg:space-y-6">
              <li className="flex items-start gap-2 sm:gap-3 w-full">
                <img
                  src="/SVG/call-calling.svg"
                  alt="phone"
                  className="w-5 h-5 sm:w-6 sm:h-6 mt-0.5 flex-shrink-0"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <a
                  href={`tel:${footerContact.phone.replace(/\s/g, "")}`}
                  className="text-text-white hover:text-brand-primary transition-colors text-sm sm:text-base break-words flex-1 overflow-hidden"
                >
                  {footerContact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 w-full">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${footerContact.email}`}
                  className="text-text-white hover:text-brand-primary transition-colors text-sm sm:text-base break-all flex-1 overflow-hidden"
                >
                  {footerContact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 w-full">
                <img
                  src="/SVG/location.svg"
                  alt="location"
                  className="w-5 h-5 sm:w-6 sm:h-6 mt-0.5 flex-shrink-0"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span className="text-text-white text-sm sm:text-base break-words flex-1 overflow-hidden">
                  {footerContact.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="w-full overflow-hidden md:col-span-2 lg:col-span-2">
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 lg:mb-8">
              {t('footer.socialMedia')}
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialMediaLinks.map((social) => (
                <Link
                  key={social.name}
                  to="#"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 hover:opacity-80 transition-opacity flex-shrink-0"
                  aria-label={social.name}
                >
                  {["facebook", "twitter", "linkedin", "instagram"].map(
                    (icon) =>
                      social.icon === icon ? (
                        <img
                          key={icon}
                          src={`/SVG/${icon}.svg`}
                          alt={icon.charAt(0).toUpperCase() + icon.slice(1)}
                          className="w-8 h-8"
                          style={{ filter: "brightness(0) invert(1)" }}
                        />
                      ) : null
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}

export default DesktopFooter;