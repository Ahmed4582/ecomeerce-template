import { useQuery } from "@tanstack/react-query";
import { checkPaymentStatusApi } from "../api/paymentsApi";

export const usePaymentStatus = (paymentid) => {
  return useQuery({
    queryKey: ["paymentStatus", paymentid],
    queryFn: () => checkPaymentStatusApi(paymentid),
    enabled: !!paymentid,
  });
};

