import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reset password logic here
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Reset Password:", formData);
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-background-white rounded-card shadow-card w-full max-w-lg p-8 sm:p-10 md:p-12">
        {/* Header */}
        <div className="mb-2 sm:mb-3 md:mb-4">
          <p className="text-text-secondary text-lg font-medium">
            {t('resetPassword.resetPassword')}
          </p>
          <h1 className="text-text-primary text-3xl font-bold">
            {t('resetPassword.enterNewPassword')}
          </h1>
        </div>

        {/* Reset Password Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 "
        >
          {/* New Password Field */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
            >
              {t('resetPassword.enterNewPassword')}
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder={t('resetPassword.newPasswordPlaceholder')}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent pr-10 sm:pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <img
                  src="/SVG/fluent_eye-20-filled.svg"
                  alt="toggle password visibility"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
            >
              {t('resetPassword.confirmPassword')}
            </label>
            <div className="relative mb-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('resetPassword.passwordPlaceholder')}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent pr-10 sm:pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <img
                  src="/SVG/fluent_eye-20-filled.svg"
                  alt="toggle password visibility"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base rounded-button font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            {t('common.confirm')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
