import React from 'react';
import Headings from '../../shared/Headings';
import img from '../../../assets/ShifToDelivery.png';

const AddReview = () => {
  return (
    <div className="py-20 bg-base-100 dark:bg-base-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left - Image with professional effect */}
          <div className="overflow-hidden rounded-3xl shadow-xl group">
            <img 
              src={img}
              alt="Parcel Delivery" 
              className="w-full transition-all duration-500 group-hover:scale-105"
            />
          </div>

          {/* Right - Text & Button */}
          <div className="flex flex-col justify-center items-center ">
            <Headings>Give Your Opinion About Our Service</Headings>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md">
              Your feedback helps us improve and serve you better.
            </p>

            <button className="button px-10 py-4 text-lg font-semibold">
              Write a Review
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddReview;