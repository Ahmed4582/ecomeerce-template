import { useMutation } from "@tanstack/react-query";
import {
  loginApi,
  registerApi,
  verifyAccountApi,
  resendCodeApi,
  forgetPasswordApi,
  resetPasswordApi,
} from "../api/authApi";
import { useAuth } from "../context/AuthContext";

// ================= LOGIN =================
export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login(data); // Stores user + token in local storage/context
    },
  });
};

// ================= REGISTER =================
export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
    // Register may not return user data (often returns just a success message).
    // The user typically verifies the account, then logs in.
  });
};

// ================= VERIFY ACCOUNT =================
export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: ({ email, code }) => verifyAccountApi(email, code),
  });
};

// ================= RESEND ACTIVATION CODE =================
export const useResendActivationCode = () => {
  return useMutation({
    mutationFn: ({ email, lan = "en" }) => resendCodeApi(email, lan),
  });
};

// ================= FORGET PASSWORD =================
export const useForgetPassword = () => {
  return useMutation({
    mutationFn: ({ email, lan = "en" }) => forgetPasswordApi(email, lan),
  });
};

// ================= RESET PASSWORD =================
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,
  });
}; 