import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRegister } from "../hooks/useAuth";
import { socialLogin } from "../lib/data";

const SignUp = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(t("errors.passwordMismatch") || "Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError(t("errors.passwordTooShort") || "Password must be at least 6 characters");
      return;
    }

    try {
      const registerData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        address: formData.address,
        lan: i18n.language || "en",
      };

      await registerMutation.mutateAsync(registerData);
      // After successful registration, navigate to email verification.
      navigate(`/email-verification?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      setError(err?.message || t("errors.signupFailed") || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-background-white rounded-card shadow-card w-full max-w-7xl p-8 sm:p-10 md:p-12">
        {/* Header */}
        <div className="mb-2 sm:mb-3 md:mb-4">
          <p className="text-text-secondary text-lg font-medium">
            {t('signup.pleaseEnterDetails')}
          </p>
          <h2 className="text-text-primary text-4xl font-bold ">
            {t('signup.createAccount')}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4 md:space-y-5"
        >
          {/* First Row: Email, Mobile, Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                {t('signup.emailAddress')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('signup.emailPlaceholder')}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <label
                htmlFor="address"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                {t("signup.address", { defaultValue: "Address" })}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={t("signup.addressPlaceholder", {
                  defaultValue: "Enter address",
                })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                required
              />
            </div>

            {/* Username Field */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="username"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                {t("signup.username", { defaultValue: "Username" })}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t("signup.usernamePlaceholder", {
                  defaultValue: "Enter username",
                })}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Second Row: Password, Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                {t('signup.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t('signup.passwordPlaceholder')}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent pr-10 sm:pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
                {t('signup.confirmPassword')}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t('signup.passwordPlaceholder')}
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
          </div>

          {/* Create Account Button */}
        <div className="flex justify-center items-center w-1/3 mx-auto ">
        <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base rounded-button font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {registerMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t('common.loading') || 'Loading...'}</span>
              </>
            ) : (
              t('signup.createAccount')
            )}
          </button>
        </div>
        </form>

        {/* Divider */}
        <div className="relative my-2 sm:my-3 md:my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-3 sm:px-4 bg-background-white text-text-secondary">
              {t('signup.orLoginWith')}
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-3 sm:gap-4">
          {socialLogin.map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="flex items-center justify-center bg-social-background border border-social-border hover:bg-social-hover transition-colors w-[clamp(60px,15vw,80.77px)] h-[clamp(35px,9vw,43.08px)] rounded-lg p-[clamp(0.5rem,2vw,1rem)]"
              aria-label={provider.aria}
            >
              <img
                src={provider.icon}
                alt={provider.name}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          ))}
        </div>

        {/* Login Link */}
        <div className="text-center mt-2 sm:mt-3 md:mt-4">
          <p className="text-text-secondary text-xs sm:text-sm">
            {t('signup.dontHaveAccount')}{" "}
            <Link
              to="/login"
              className="text-brand-primary hover:text-brand-primary-hover font-medium transition-colors"
            >
              {t('login.loginNow')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
