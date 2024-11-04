import React from 'react';
import { motion } from 'framer-motion';

function Asking({ text, title, link, btntext }) {
  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-auto md:w-1/2 lg:w-1/3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <img
        src={link}
        alt={title}
        className="w-full h-auto object-cover rounded-t-lg"
      />

      {/* Content */}
      <div className="p-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{text}</p>

        {/* Button */}
        <button className="px-4 py-2 bg-yellow-400 text-white font-medium rounded-full hover:bg-yellow-500 transition-colors duration-300">
          {btntext}
        </button>
      </div>
    </motion.div>
  );
}

export default Asking;
