import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerimg1 from "../../../assets/banner/banner1.jpg";
import bannerimg2 from "../../../assets/banner/banner2.jpg";
import bannerimg3 from "../../../assets/banner/banner3.jpg";
import CustomButton from "../../shared/buttons/CustomButton";

const Banner = () => {
  return (
    <div className="w-full ">
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false}
      >
        {/* স্লাইড ১ */}
        <div className="relative h-[80vh] w-full flex items-center justify-center bg-gray-900 ">
          <img 
            src={bannerimg1} 
            className="h-full w-full " 
            alt="Banner 1"
          />
          {/* এই অংশটি বাটনের জন্য */}
          <div className="absolute inset-0 flex justify-start gap-3 items-end bg-black/20">
             
             <CustomButton text="Track Parcel" />
             <CustomButton text="Be a Rider" />
          </div>
        </div>

        {/* স্লাইড ২ */}
        <div className="relative h-[80vh] w-full flex items-center justify-center bg-gray-900">
          <img 
            src={bannerimg2} 
            className="h-full w-full " 
            alt="Banner 2"
          />
          <div className="absolute inset-0 flex justify-start gap-3 items-end bg-black/20">
             
             <CustomButton text="Track Parcel" className='!bg-green-500 shadow-lg' />
             <CustomButton text="Be a Rider" />
          </div>
        </div>

        {/* স্লাইড ৩ */}
        <div className="relative h-[80vh] w-full flex items-center justify-center bg-gray-900">
          <img 
            src={bannerimg3} 
            className="h-full w-full " 
            alt="Banner 3"
          />
          <div className="absolute inset-0 flex justify-start gap-3 items-end bg-black/20">
             
             <CustomButton text="Track Parcel" />
             <CustomButton text="Be a Rider" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;