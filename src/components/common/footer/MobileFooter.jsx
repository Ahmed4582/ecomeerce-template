import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  footerPages,
  footerServices,
  socialMediaLinks,
} from "../../../lib/data";

const MobileFooter = () => {
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
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden gap-6">
          {/* Row 1: Logo */}
          <div className="flex justify-center">
            <img
              src="/SVG/logo-footer.svg"
              alt="logo"
              className="w-16 h-16 flex-shrink-0"
            />
          </div>

          {/* Row 2: Text */}
          <div className="flex justify-center">
            <p className="text-text-white font-normal text-xs text-center">
              {t('footer.downloadApp')}
            </p>
          </div>

          {/* Row 3: App Store Buttons */}
          <div className="flex justify-center gap-3">
            <img
              src="/SVG/googleplay.svg"
              alt="Google Play"
              className="max-w-[140px] cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
            />
            <img
              src="/SVG/appstore.svg"
              alt="App Store"
              className="max-w-[140px] cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
            />
          </div>

          {/* Row 4: Social Media Icons */}
          <div className="flex justify-center gap-3">
            {socialMediaLinks.map((social) => (
              <Link
                key={social.name}
                to="#"
                className="flex items-center justify-center w-10 h-10 hover:opacity-80 transition-opacity flex-shrink-0"
                aria-label={social.name}
              >
                {["facebook", "twitter", "linkedin", "instagram"].map((icon) =>
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

          {/* Row 5: Pages and Services */}
          <div className="grid grid-cols-2 gap-6 text-center">
            {/* Pages Section */}
            <div className="w-full overflow-hidden">
              <h3 className="text-base font-bold mb-4">{t('footer.pages')}</h3>
              <ul className="space-y-3">
                {footerPages.map((page) => (
                  <li key={page} className="w-full">
                    <Link
                      to="#"
                      className="text-text-white hover:text-brand-primary transition-colors text-sm block w-full break-words"
                    >
                      {t(getFooterPageTranslation(page))}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Section */}
            <div className="w-full overflow-hidden">
              <h3 className="text-base font-bold mb-4">{t('footer.service')}</h3>
              <ul className="space-y-3">
                {footerServices.map((service) => (
                  <li key={service} className="w-full">
                    <Link
                      to="#"
                      className="text-text-white hover:text-brand-primary transition-colors text-sm block w-full break-words"
                    >
                      {t(getFooterServiceTranslation(service))}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </>
  );
};

export default MobileFooter;