import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      Swal.fire({
        title: "Payment Successful!",
        text: "Your parcel payment has been completed.",
        icon: "success",
        confirmButtonColor: "#5C3D99",
      });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-8xl mb-6">✅</div>
        <h1 className="text-4xl font-bold text-base-content mb-4">Payment Successful</h1>
        <p className="text-base-content/70 mb-8">
          Thank you! Your parcel payment has been processed successfully.
        </p>
        <button
          onClick={() => navigate("/dashboard/my-parcels")}
          className="button px-8 py-3 text-lg"
        >
          Go to My Parcels
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;