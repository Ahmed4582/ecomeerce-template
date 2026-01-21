import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForgetPassword } from "../hooks/useAuth";

const ForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const forgetPasswordMutation = useForgetPassword();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError(t("errors.emailRequired") || "Email is required");
      return;
    }

    try {
      await forgetPasswordMutation.mutateAsync({
        email,
        lan: i18n.language || "en",
      });
      setSuccess(
        t("forgetPassword.success") ||
          "Password reset code has been sent to your email"
      );
    } catch (err) {
      setError(err?.message || t("errors.forgetPasswordFailed") || "Failed to send reset code");
    }
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-background-white rounded-card shadow-card w-full max-w-lg p-8 sm:p-10 md:p-14">
        {/* Header */}
        <div className="mb-2 sm:mb-3 md:mb-4">
          <p className="text-text-secondary text-xs sm:text-sm">
            {t("forgetPassword.pleaseEnterEmail") || "Please enter your email address"}
          </p>
          <h2 className="text-text-primary font-semibold text-[clamp(24px,5vw,35px)]">
            {t("forgetPassword.forgetPassword") || "Forget Password"}
          </h2>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1">
              {t("forgetPassword.emailAddress") || "Email Address"}
            </label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder={t("forgetPassword.emailPlaceholder") || "Enter your email"}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={forgetPasswordMutation.isPending}
            className="w-full bg-brand-primary text-white py-3 rounded-button flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {forgetPasswordMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("common.loading")}
              </>
            ) : (
              t("forgetPassword.sendCode") || "Send Reset Code"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm text-brand-primary hover:text-brand-primary-hover"
          >
            {t("forgetPassword.backToLogin") || "Back to Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
