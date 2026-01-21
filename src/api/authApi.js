import api from "./axiosClient";

// ================= AUTH =================

export const loginApi = (data) => {
  return api.post("/Auth/Login", data);
};

export const registerApi = (data) => {
  return api.post("/Auth/Register", data);
};

export const verifyAccountApi = (email, code) => {
  return api.post(
    `/Auth/VerificationAccount?email=${email}&code=${code}`
  );
};

export const resendCodeApi = (email, lan = "en") => {
  return api.post(
    `/Auth/ResendActivationCode?email=${email}&lan=${lan}`
  );
};

export const forgetPasswordApi = (email, lan = "en") => {
  return api.post(
    `/Auth/ForgetPassword?email=${email}&lan=${lan}`
  );
};

export const resetPasswordApi = (data) => {
  return api.post("/Auth/ResetPassword", data);
};
