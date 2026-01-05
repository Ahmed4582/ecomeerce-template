import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const EmailVerification = ({ email = "test@gmail.com", onVerify }) => {
  const { t } = useTranslation();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const updateCode = (newCode) => {
    setCode(newCode);
    if (newCode.every((digit) => digit !== "") && onVerify) {
      onVerify(newCode.join(""));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length === 6 && onVerify) {
      onVerify(verificationCode);
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
            disabled={code.some((digit) => digit === "")}
            className="w-full  bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-medium rounded-button transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            {t('common.verification')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
