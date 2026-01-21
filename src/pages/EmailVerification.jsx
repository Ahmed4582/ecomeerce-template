import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyAccount, useResendActivationCode } from "../hooks/useAuth";

const EmailVerification = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const verifyMutation = useVerifyAccount();
  const resendMutation = useResendActivationCode();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateCode = (newCode) => {
    setCode(newCode);
    // Auto-submit when all 6 digits are filled
    if (newCode.every((digit) => digit !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleVerify = async (verificationCode) => {
    if (!email) {
      setError(t("errors.emailRequired") || "Email is required");
      return;
    }

    try {
      await verifyMutation.mutateAsync({ email, code: verificationCode });
      setSuccess(t("emailVerification.success") || "Account verified successfully!");
      setError("");
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err?.message || t("errors.verificationFailed") || "Verification failed");
      setSuccess("");
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError(t("errors.emailRequired") || "Email is required");
      return;
    }

    try {
      await resendMutation.mutateAsync({ email, lan: i18n.language || "en" });
      setSuccess(t("emailVerification.codeResent") || "Verification code resent successfully!");
      setError("");
      setCode(["", "", "", "", "", ""]); // Reset code
    } catch (err) {
      setError(err?.message || t("errors.resendFailed") || "Failed to resend code");
      setSuccess("");
    }
  };

  const handleChange = (index, value) => {
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const newCode = [...code];
    newCode[index] = value;
    updateCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (code[index]) {
        newCode[index] = "";
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newCode[index - 1] = "";
      }
      updateCode(newCode);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .split("")
      .filter((char) => /^\d$/.test(char));

    if (digits.length > 0) {
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (i < 6) newCode[i] = digit;
      });
      updateCode(newCode);

      const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
      inputRefs.current[nextEmptyIndex === -1 ? 5 : nextEmptyIndex]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      await handleVerify(verificationCode);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-background-white rounded-card shadow-card w-full max-w-lg p-8 sm:p-10 md:p-12">
        {/* Header */}
        <div className="mb-2 sm:mb-3 md:mb-4">
          <h1 className="text-text-primary text-2xl font-bold ">
            {t('emailVerification.checkEmail')}
          </h1>
          <p className="text-text-secondary text-lg font-medium">
            {t('emailVerification.enterCode')}{" "}
            <span className="text-brand-primary lowercase">{email}</span>
          </p>
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

        {/* Verification Code Input */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 "  
        >
          <div className="flex justify-center gap-2 sm:gap-3">
            {code.map((digit, index) => {
              const isFilled = digit !== "";
              const firstEmptyIndex = code.findIndex((d) => d === "");
              const isActive = !isFilled && index === firstEmptyIndex;

              return (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`aspect-square w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-14 text-center text-base sm:text-lg md:text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-0 transition-all mb-3 ${
                    isFilled
                      ? "border-brand-primary bg-background-white text-text-primary"
                      : isActive
                      ? "border-brand-primary bg-background-white"
                      : "border-border-light bg-background-white"
                  }`}
                />
              );
            })}
          </div>

          {/* Verification Button */}
          <button
            type="submit"
            disabled={code.some((digit) => digit === "") || verifyMutation.isPending}
            className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-medium rounded-button transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 flex items-center justify-center gap-2"
          >
            {verifyMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t('common.loading')}
              </>
            ) : (
              t('common.verification')
            )}
          </button>
        </form>

        {/* Resend Code */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendMutation.isPending || !email}
            className="text-sm text-brand-primary hover:text-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendMutation.isPending
              ? t('common.loading')
              : t('emailVerification.resendCode') || 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
