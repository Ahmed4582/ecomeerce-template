import { useSearchParams } from "react-router-dom";
import { usePaymentStatus } from "../hooks/paymentsHooks";

const PaymentStatus = () => {
  const [params] = useSearchParams();
  const paymentid = params.get("paymentid") || "";
  const q = usePaymentStatus(paymentid);

  return (
    <div className="bg-background-light-gray min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="bg-background-white rounded-2xl shadow-card p-6">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Payment Status
          </h1>

          {!paymentid ? (
            <div className="text-text-secondary">
              Missing `paymentid` in URL.
            </div>
          ) : q.isLoading ? (
            <div className="text-text-secondary">Loading...</div>
          ) : q.isError ? (
            <div className="text-red-600">{q.error?.message || "Error"}</div>
          ) : (
            <pre className="bg-background-primary rounded-lg p-4 overflow-auto text-xs">
{JSON.stringify(q.data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;

