import  { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { socialLogin } from "../lib/data";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-background-white rounded-card shadow-card w-full max-w-lg p-8 sm:p-10 md:p-14">
        {/* Header */}
        <div className="mb-1 sm:mb-2 md:mb-3">
          <p className="text-text-secondary text-xs sm:text-sm md:text-base">
            {t('login.pleaseEnterDetails')}
          </p>
          <h2 className="text-text-primary capitalize font-sans font-semibold text-[clamp(24px,5vw,35.32px)] leading-[clamp(30px,6vw,44.15px)] tracking-normal align-middle">
            {t('login.welcomeBack')}
          </h2>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 "
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
            >
              {t('login.emailAddress')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.emailPlaceholder')}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border-input border-input-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
            >
              {t('login.password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
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

          {/* Forget Password Link */}
          <div className="text-right">
            <Link
              to="/forget-password"
              className="text-text-secondary hover:text-brand-primary text-xs sm:text-sm transition-colors"
            >
              {t('login.forgetPassword')}
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base rounded-button font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            {t('common.login')}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-2 sm:my-3 md:my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-3 sm:px-4 bg-background-white text-text-secondary">
              {t('login.orLoginWith')}
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

        {/* Sign Up Link */}
        <div className="text-center mt-2 sm:mt-3 md:mt-4">
          <p className="text-text-secondary text-xs sm:text-sm">
            {t('login.dontHaveAccount')}{" "}
            <Link
              to="/signup"
              className="text-brand-primary hover:text-brand-primary-hover font-medium transition-colors"
            >
              {t('common.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
