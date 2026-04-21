import { useNavigate } from "react-router";


const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-8xl mb-6">❌</div>
        <h1 className="text-4xl font-bold text-base-content mb-4">Payment Cancelled</h1>
        <p className="text-base-content/70 mb-8">
          You have cancelled the payment. No charges were made.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard/my-parcels")}
            className="button px-8 py-3 text-lg"
          >
            Back to My Parcels
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;