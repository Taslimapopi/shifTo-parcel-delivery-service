"use client";
import React from "react";

// Reusable Star component to display ratings
const Star = ({ filled }) => (
  <span className={filled ? "text-yellow-400" : "text-gray-300"}>★</span>
);

// Reusable ReviewCard component
const ReviewCard = ({ review }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
    {/* User Info */}
    <div className="flex items-center gap-4 mb-4">
      <img
        src={review.image}
        alt={review.name}
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <h3 className="font-semibold text-lg">{review.name}</h3>
        <p className="text-sm text-gray-500">{review.role}</p>
      </div>
    </div>

    {/* Rating */}
    <div className="mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} filled={i < review.rating} />
      ))}
    </div>

    {/* Comment */}
    <p className="text-gray-700 text-sm leading-relaxed">
      “{review.comment}”
    </p>
  </div>
);

export default ReviewCard;