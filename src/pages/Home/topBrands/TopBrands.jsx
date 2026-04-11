import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import Headings from "../../shared/Headings";

const TopBrands = () => {
  const brands = [
    {
      name: "Daraz",
      logo: "https://discover.daraz.com/images/Group_1083-1644460875.svg",
    },
    {
      name: "Chaldal",
      logo: "https://venture.com.bd/wp-content/uploads/2024/09/chaldal.png",
    },
    {
      name: "ShopUp",
      logo: "https://cdn.prod.website-files.com/6538a2c4ccf1fed5a7d6e311/661e20ec03673cb2f41ff4c2_ShopUp-open-graph.jpg",
    },
    {
      name: "Pickaboo",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCSc9bTtAvU_gRwpdM8eroew2U5WfYHdRWA&s",
    },
    {
      name: "Aarong",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzaxPlSdYc3WeJgjjjRkFB4uK741agZ2E9NA&s",
    },
    {
      name: "Shwapno",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAKQvoHpSbGFEYZ2JmZ3JVJYG_-T9s8cm03Q&s",
    },
    {
      name: "Walton",
      logo: "https://futurestartup.com/wp-content/uploads/2016/05/Walton-logo.jpg",
    },
    {
      name: "RFL",
      logo: "https://www.bssnews.net/assets/news_photos/2023/09/05/image-145767-1693904407.jpg",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">
        <Headings>Serving the Nation’s Fastest Growing Companies</Headings>

        <Swiper
          spaceBetween={30}
          slidesPerView={6}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 35 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center h-28   duration-500">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopBrands;