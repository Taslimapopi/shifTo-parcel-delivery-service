import React from 'react';

const Loading = ({ fullScreen = true }) => {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]' : 'py-12'}`}>
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        
        {/* Brand Text */}
        <p className="mt-6 text-xl font-semibold tracking-widest text-white">
          SHIFTO
        </p>
        <p className="text-sm text-white/70 mt-1">Delivering fast...</p>
      </div>
    </div>
  );
};

export default Loading;