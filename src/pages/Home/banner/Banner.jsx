import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerimg1 from "../../../assets/banner/1.png";
import bannerimg2 from "../../../assets/banner/2.png";
import bannerimg3 from "../../../assets/banner/3.png";
import bannerimg4 from "../../../assets/banner/4.png";
import bannerimg5 from "../../../assets/banner/5.png";
import bannerimg6 from "../../../assets/banner/6.png";
import bannerimg7 from "../../../assets/banner/7.png";
import bannerimg8 from "../../../assets/banner/8.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="w-full">
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false}
        showArrows={false}
        interval={1000}
        transitionTime={200}
        className="rounded-b-3xl overflow-hidden rounded-2xl border-1 border-secondary"
      >
        {/* Slide 1 */}
        <div className="relative h-[85vh] md:h-[90vh] flex items-baseline-last justify-center">
          <img 
            src={bannerimg1} 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Fast parcel delivery"
          />
          <div className="absolute inset-0 " />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-white">
           
            
            <div className="flex flex-wrap gap-4">
              <button className="button px-8 py-3 text-lg font-semibold">
                Track Parcel
              </button>
              <Link to='/be-rider' className="button px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Be a Rider
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[85vh] md:h-[90vh] flex items-end justify-center">
          <img 
            src={bannerimg2} 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Be a rider"
          />
          <div className="absolute inset-0 " />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-white">
           
            
            <div className="flex flex-wrap gap-4">
              <button className="button px-8 py-3 text-lg font-semibold">
                Track Parcel
              </button>
              <Link to='/be-rider' className="button px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Be a Rider
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[85vh] md:h-[90vh] flex items-end justify-center">
          <img 
            src={bannerimg3} 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Reliable delivery"
          />
          <div className="absolute inset-0 " />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-white">
           
            <div className="flex flex-wrap gap-4">
              <button className="button px-8 py-3 text-lg font-semibold">
                Track Parcel
              </button>
              <Link to='/be-rider' className="button px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Be a Rider
              </Link>
            </div>
          </div>
        </div>
        {/* Slide 4 */}
        <div className="relative h-[85vh] md:h-[90vh] flex items-end justify-center">
          <img 
            src={bannerimg4} 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Reliable delivery"
          />
          <div className="absolute inset-0 " />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-white">
           
            <div className="flex flex-wrap gap-4">
              <button className="button px-8 py-3 text-lg font-semibold">
                Track Parcel
              </button>
              <Link to='/be-rider' className="button px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Be a Rider
              </Link>
            </div>
          </div>
        </div>
        {/* Slide 5 */}
        <div className="relative h-[85vh] md:h-[90vh] flex items-end justify-center">
          <img 
            src={bannerimg5} 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Reliable delivery"
          />
          <div className="absolute inset-0 " />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-white">
           
            <div className="flex flex-wrap gap-4">
              <button className="button px-8 py-3 text-lg font-semibold">
                Track Parcel
              </button>
              <Link to='/be-rider' className="button px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Be a Rider
              </Link>
            </div>
          </div>
        </div>
        {/* Slide 6 */}
        <div className="relative h-[85vh] md:h-[90vh] flex items-end justify-center">
          <img 
            src={bannerimg6} 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Reliable delivery"
          />
          <div className="absolute inset-0 " />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-white">
           
            <div className="flex flex-wrap gap-4">
              <button className="button px-8 py-3 text-lg font-semibold">
                Track Parcel
              </button>
              <Link to='/be-rider' className="button px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Be a Rider
              </Link>
            </div>
          </div>
        </div>
        {/* Slide 7 */}
        <div className="relative h-[85vh] md:h-[90vh] flex items-end justify-center">
          <img 
            src={bannerimg7} 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Reliable delivery"
          />
          <div className="absolute inset-0 " />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-white">
           
            <div className="flex flex-wrap gap-4">
              <button className="button px-8 py-3 text-lg font-semibold">
                Track Parcel
              </button>
              <Link to='/be-rider' className="button px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Be a Rider
              </Link>
            </div>
          </div>
        </div>
        {/* Slide 8 */}
        <div className="relative h-[85vh] md:h-[90vh] flex items-end justify-center">
          <img 
            src={bannerimg8} 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Reliable delivery"
          />
          <div className="absolute inset-0 " />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-white">
           
            <div className="flex flex-wrap gap-4">
              <button className="button px-8 py-3 text-lg font-semibold">
                Track Parcel
              </button>
              <Link to='/be-rider' className="button px-8 py-3 text-lg font-semibold bg-white text-black hover:bg-gray-100">
                Be a Rider
              </Link>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;