import { useTranslation } from "react-i18next";

const SuccessPopup = ({ onContinue }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl  w-full text-center relative overflow-hidden">
        {/* Success Icon with SVG */}
        <div className="mb-4 sm:mb-6 relative flex items-center justify-center">
          <div className="relative">
            <img
              src="/SVG/Success.svg"
              alt="Success"
              className="w-48 h-48 sm:w-96 sm:h-96 mx-auto"
            />
          </div>
        </div>

        {/* Success Message */}
        <p className="text-sm sm:text-base md:text-2xl font-normal text-[#212844] mb-4 sm:mb-6  px-2">
          {t("cart.successMessage")}
        </p>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full bg-[#FC813B] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold hover:bg-[#e6733a] transition-colors"
        >
          {t("cart.continue")}
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;

