import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLogin } from "../hooks/useAuth";
import { socialLogin } from "../lib/data";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginMutation.mutateAsync({ email, password });
      navigate("/"); // Navigate after successful login
    } catch (err) {
      setError(err?.message || t("errors.loginFailed") || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-background-white rounded-card shadow-card w-full max-w-lg p-8 sm:p-10 md:p-14">
        {/* Header */}
        <div className="mb-2">
          <p className="text-text-secondary text-xs sm:text-sm">
            {t("login.pleaseEnterDetails")}
          </p>
          <h2 className="text-text-primary font-semibold text-[clamp(24px,5vw,35px)]">
            {t("login.welcomeBack")}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">
              {t("login.emailAddress")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("login.emailPlaceholder")}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">{t("login.password")}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("login.passwordPlaceholder")}
                className="w-full px-4 py-3 border rounded-lg pr-10 focus:ring-2 focus:ring-brand-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <img
                  src="/SVG/fluent_eye-20-filled.svg"
                  className="w-5 h-5"
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>

          {/* Forget password */}
          <div className="text-right">
            <Link
              to="/forget-password"
              className="text-sm text-text-secondary hover:text-brand-primary"
            >
              {t("login.forgetPassword")}
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-brand-primary text-white py-3 rounded-button flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {loginMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("common.loading")}
              </>
            ) : (
              t("common.login")
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background-white px-3 text-text-secondary">
              {t("login.orLoginWith")}
            </span>
          </div>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4">
          {socialLogin.map((provider) => (
            <button key={provider.name} type="button">
              <img src={provider.icon} alt={provider.name} />
            </button>
          ))}
        </div>

        {/* Sign up */}
        <p className="text-center mt-4 text-sm">
          {t("login.dontHaveAccount")}{" "}
          <Link to="/signup" className="text-brand-primary">
            {t("common.signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
