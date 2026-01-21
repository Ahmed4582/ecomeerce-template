import api from "./axiosClient";

// ================= PAYMENTS =================

export const checkPaymentStatusApi = (paymentid) => {
  return api.get("/Payments/CheckPaymentStatus", { params: { paymentid } });
};

