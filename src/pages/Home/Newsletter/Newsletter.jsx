import React from 'react';
import newsletterBg from '../../../assets/newslwtters.png'; // change path if needed

const Newsletter = () => {
  return (
    <div className="relative h-[460px] flex items-center overflow-hidden rounded-t-4xl rounded-b-4xl">
      {/* Background Image */}
      <img 
        src={newsletterBg} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/75 to-black/80" /> */}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center text-black">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Stay Updated with Shifto</h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Get exclusive offers, delivery tips &amp; latest news directly in your inbox
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 px-6 py-4 rounded-3xl bg-white/90 border-2 border-white focus:border-white focus:outline-none text-black placeholder:text-gray-600"
          />
          <button className="button px-12 py-4 text-lg font-semibold">
            Subscribe
          </button>
        </div>

        <p className="text-xs mt-6 opacity-70">We hate spam too. Unsubscribe anytime.</p>
      </div>
    </div>
  );
};

export default Newsletter;