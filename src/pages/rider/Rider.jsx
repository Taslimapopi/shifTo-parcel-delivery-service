import React from "react";
import RiderApplyForm from "./RiderApplyForm/RiderApplyForm";


const Rider = () => {
  return (
     <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601582589907-f92af5ed9db8')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CENTER FORM */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-2xl">
          <RiderApplyForm />
        </div>
      </div>
    </div>
  );
};

export default Rider;