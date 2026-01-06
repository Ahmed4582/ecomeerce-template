import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../../../context";
import LanguageSwitcher from "./LanguageSwitcher";

const TopBar = () => {
  const { t } = useTranslation();
  const { currency, changeCurrency, availableCurrencies } = useCurrency();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  return (
    <>
      {/* Top Bar - Dark Blue */}
      <div className="bg-[#2A3663] text-[#212844] py-2 sm:py-2.5 hidden lg:block">
        <div className="container mx-auto p-1">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            {/* Left Side */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
              <div className="relative">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center gap-1 sm:gap-1.5 hover:text-brand-primary transition-colors"
                >
                  <img
                    src="/SVG/location.svg"
                    alt="location"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  <span className="text-text-white">
                    {t("common.deliverToLocation")}
                  </span>
                  <img
                    src="/SVG/arrow-down.svg"
                    alt="arrow down"
                    className="w-2 h-2"
                  />
                </button>
              </div>
              <div className="h-4 w-px bg-white opacity-30"></div>
              <Link
                to="/track-order"
                className="flex items-center gap-1 sm:gap-1.5 hover:text-brand-primary transition-colors"
              >
                <img
                  src="/SVG/truck-fast.svg"
                  alt="track order"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span className="text-text-white">
                  {t("common.trackOrder")}
                </span>
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
              <div className="relative">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-1 sm:gap-1.5 hover:text-brand-primary transition-colors"
                >
                  <img
                    src="/SVG/money-4.svg"
                    alt="currency"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <span className="text-text-white">{currency}</span>
                  <img
                    src="/SVG/arrow-down.svg"
                    alt="arrow down"
                    className="w-2 h-2"
                  />
                </button>
                {showCurrencyDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-white border-opacity-20 rounded shadow-lg z-50 min-w-[100px]">
                    {availableCurrencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          changeCurrency(curr);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`block w-full text-left px-3 py-2 hover:bg-white hover:bg-opacity-10 transition-colors ${
                          currency === curr ? "bg-white bg-opacity-10" : ""
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="h-4 w-px bg-white opacity-30"></div>
              <LanguageSwitcher variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
