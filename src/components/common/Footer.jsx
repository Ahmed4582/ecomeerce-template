import { MobileFooter, DesktopFooter } from "./footer/index";

const Footer = () => {
  return (
    <footer className="bg-background-dark-blue text-text-white mt-12 sm:mt-16 lg:mt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Mobile Layout */}
        <MobileFooter />

        {/* Desktop/Tablet Layout */}
        <DesktopFooter />
      </div>
    </footer>
  );
};

export default Footer;
