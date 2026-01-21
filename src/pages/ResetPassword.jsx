import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPassword } from "../hooks/useAuth";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email");
  const codeFromUrl = searchParams.get("code");

  const resetPasswordMutation = useResetPassword();

  const [formData, setFormData] = useState({
    email: emailFromUrl || "",
    code: codeFromUrl || "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate email and code
    if (!formData.email || !formData.code) {
      setError(t("errors.emailAndCodeRequired") || "Email and code are required");
      return;
    }

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t("errors.passwordMismatch") || "Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 6) {
      setError(t("errors.passwordTooShort") || "Password must be at least 6 characters");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        email: formData.email,
        code: formData.code,
        newpass: formData.newPassword,
      });
      setSuccess(t("resetPassword.success") || "Password reset successfully!");
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err?.message || t("errors.resetPasswordFailed") || "Failed to reset password");
    }
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

        {/* Success Message */}
        {success && (
          <div className="mb-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Reset Password Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 "
        >
          {/* Email Field (if not from URL) */}
          {!emailFromUrl && (
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                {t('resetPassword.email') || 'Email Address'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('resetPassword.emailPlaceholder') || 'Enter your email'}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                required
              />
            </div>
          )}

          {/* Code Field (if not from URL) */}
          {!codeFromUrl && (
            <div>
              <label
                htmlFor="code"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                {t('resetPassword.resetCode') || 'Reset Code'}
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder={t('resetPassword.codePlaceholder') || 'Enter reset code from email'}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                required
              />
            </div>
          )}

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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

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
            disabled={resetPasswordMutation.isPending}
            className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base rounded-button font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {resetPasswordMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('common.loading') || 'Loading...'}</span>
              </>
            ) : (
              t('common.confirm')
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
