import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { constant } from "firebase/firestore/pipelines";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionId) {
      setLoading(true);
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
          setLoading(false);
          
          // Uncomment to show success alert
          // Swal.fire({
          //   title: "Payment Successful!",
          //   text: "Your parcel payment has been completed.",
          //   icon: "success",
          //   confirmButtonColor: "#5C3D99",
          // });
        })
        .catch((error) => {
          console.error("Payment verification failed:", error);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-8xl mb-6">✅</div>
        <h1 className="text-4xl font-bold text-base-content mb-4">Payment Successful</h1>
        <p className="text-base-content/70 mb-8">
          Thank you! Your parcel payment has been processed successfully.
        </p>

        {/* Payment Details Section */}
        {!loading && Object.keys(paymentInfo).length > 0 && (
          <div className="bg-base-200 rounded-xl p-6 mb-8 w-full max-w-sm mx-auto">
            <h3 className="text-xl font-semibold text-base-content mb-4">Payment Details</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center py-2 border-b border-base-300">
                <span className="text-base-content/80 font-medium">Tracking ID:</span>
                <span className="font-bold text-base-content bg-base-100 px-3 py-1 rounded-md text-sm">
                  {paymentInfo.trackingId}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-base-content/80 font-medium">Transaction ID:</span>
                <span className="font-bold text-base-content bg-base-100 px-3 py-1 rounded-md text-sm">
                  {paymentInfo.transactionId}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center mb-8">
            <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
            <p className="text-base-content/70">Verifying payment...</p>
          </div>
        )}

        <button
          onClick={() => navigate("/dashboard/my-parcels")}
          className="button px-10 py-3.5 text-lg mx-auto block"
          disabled={loading}
        >
          Go to My Parcels
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;