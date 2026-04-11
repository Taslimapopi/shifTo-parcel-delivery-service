import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-6">
    
      <div className="text-center max-w-md">
        {/* Animated 404 */}
        <div className="text-[120px] md:text-[160px] font-bold text-primary/50 leading-none animate-pulse">
          404
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white -mt-8 mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="button px-10 py-4 text-lg font-semibold flex items-center gap-3 mx-auto group"
        >
          ← Go Back
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <p className="text-sm text-gray-500 mt-8">
          or go to <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate('/')}>Homepage</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;