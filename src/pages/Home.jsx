import React from 'react';
import { motion } from 'framer-motion';
import Swiper1 from '../component/Swiper1';
import Asking from '../component/Asking';

function Home() {
  return (
    <div className="home-container">
      {/* Swiper Carousel */}
      <Swiper1 />

      {/* Recommendation Section */}
      <motion.div
        className="flex flex-col md:flex-row p-4 m-4 h-[600px] gap-6 justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Text Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="text-3xl font-bold text-center md:text-left text-yellow-400 mb-2">
            Recommendations underway
          </h1>
          <p className="text-lg text-black text-center md:text-left">
            Select a few homes you like, and we'll find recommendations for you.
          </p>
        </motion.div>

        {/* Image with Motion */}
        <motion.img
          src="/assests/7.webp"
          alt="Home Recommendation"
          className="w-[650px] h-[500px] object-cover"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </motion.div>

      {/* Asking Section */}
      <div className="flex  gap-11 justify-center items-center h-[600px] w-full p-5">
        <Asking
          title="Buy a Home"
          text="Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else."
          link="/assests/8.webp"
          btntext="Browse Homes"
        />
        <Asking
          title="Rent a Home"
          text="Discover rental homes with photos and details to help you find the perfect fit for your needs."
          link="/assests/9.webp"
          btntext="Browse Rentals"
        />
      </div>
    </div>
  );
}

export default Home;
