import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  return (
    <div className="bg-background-light-gray min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="max-w-2xl w-full text-center"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="text-9xl sm:text-[150px] font-bold text-brand-primary leading-none">
              404
            </h1>
          </div>

          {/* Error Icon */}
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t("notFound.title") || "Page Not Found"}
          </h2>

          {/* Description */}
          <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
            {t("notFound.description") ||
              "Sorry, the page you are looking for does not exist or has been moved."}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/")}
              className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-3 rounded-button font-semibold transition-colors w-full sm:w-auto"
            >
              {t("notFound.goToHome") || "Go to Home"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-background-white hover:bg-gray-100 text-text-primary border border-border-light px-8 py-3 rounded-button font-semibold transition-colors w-full sm:w-auto"
            >
              {t("notFound.goBack") || "Go Back"}
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-border-light">
            <p className="text-text-secondary mb-4">
              {t("notFound.helpfulLinks") || "You might be looking for:"}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/")}
                className="text-brand-primary hover:text-brand-primary-hover font-medium transition-colors"
              >
                {t("header.home") || "Home"}
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="text-brand-primary hover:text-brand-primary-hover font-medium transition-colors"
              >
                {t("common.cart") || "Cart"}
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="text-brand-primary hover:text-brand-primary-hover font-medium transition-colors"
              >
                {t("header.contactUs") || "Contact Us"}
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="text-brand-primary hover:text-brand-primary-hover font-medium transition-colors"
              >
                {t("profile.personalInformation") || "Profile"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

