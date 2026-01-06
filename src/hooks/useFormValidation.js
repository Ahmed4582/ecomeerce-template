import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useFormValidation = (initialValues = {}) => {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation rules
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validate = (name, value) => {
    let error = "";

    // Required field validation
    if (!value || value.trim() === "") {
      error = t("errors.requiredField") || "This field is required";
      return error;
    }

    // Email validation
    if (name === "email" || name === "emailAddress") {
      if (!validateEmail(value)) {
        error = t("errors.invalidEmail") || "Please enter a valid email address";
      }
    }

    // Phone validation
    if (name === "phone" || name === "mobile" || name === "phoneNumber") {
      if (!validatePhone(value)) {
        error = t("errors.invalidPhone") || "Please enter a valid phone number";
      }
    }

    // Password validation
    if (name === "password" || name === "newPassword") {
      if (!validatePassword(value)) {
        error = t("errors.passwordTooShort") || "Password must be at least 6 characters";
      }
    }

    // Confirm password validation
    if (name === "confirmPassword") {
      if (value !== values.password && value !== values.newPassword) {
        error = t("errors.passwordMismatch") || "Passwords do not match";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validate(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (onSubmit) => {
    return (e) => {
      e.preventDefault();
      
      // Validate all fields
      const newErrors = {};
      let isValid = true;

      Object.keys(values).forEach((name) => {
        const error = validate(name, values[name]);
        if (error) {
          newErrors[name] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      setTouched(
        Object.keys(values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );

      if (isValid) {
        onSubmit(values);
      }
    };
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors,
  };
};

