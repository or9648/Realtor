import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define image URLs directly
const images = [
  '/assests/1.jpg',
  '/assests/2.jpg',
  '/assests/3.jpg',
  '/assests/4.jpg',
];
function Swiper1() {
  return (
    <div className="home-carousel-container">
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className="swiper-container"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-[500px] rounded-lg" />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  )
}

export default Swiper1