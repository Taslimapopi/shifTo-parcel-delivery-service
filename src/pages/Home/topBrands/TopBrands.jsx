import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import Headings from "../../shared/Headings";

const TopBrands = () => {
  const topBrands = [
    "Daraz",
    "Chaldal",
    "ShopUp",
    "Pickaboo",
    "Aarong",
    "Shwapno",
    "Walton",
    "RFL",
  ];
  return (
    <div>
        <Headings>Serving the Nation’s Fastest Growing Companies</Headings>
     
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        centeredSlides={true}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {topBrands.map((b, index) => (
          <SwiperSlide key={index}>{b}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopBrands;
