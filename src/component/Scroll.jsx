import React, { useEffect, useState, useRef } from 'react';
import { getListById } from '../function/all';
import Card from '../component/Card';

function Scroll() {
  const [properties, setProperties] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const items = await getListById();
        setProperties(items);
      } catch (error) {
        console.error("Error loading properties:", error);
      }
    }
    fetchData();
  }, []);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust scroll distance as needed
        behavior: 'smooth'
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust scroll distance as needed
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mt-14 p-5">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">All Properties</h2>
      
      {/* Left Arrow */}
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
      >
        &larr;
      </button>

      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto space-x-4  p-11"
        style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
      >
        {properties.map((item) => (
          <div key={item.id} className="  flex-shrink-0 w-80" style={{ scrollSnapAlign: 'start' }}>
            <Card
              type={item.type || 'No type'}
              address={item.address || 'No address available'}
              image={item.image} // Assuming 'image' holds the image URL
              buttonText="View Details"
              onButtonClick={() => alert(`Viewing details for ${item.bhk ? `${item.bhk} BHK` : 'this property'}`)}
              price={item.price} 
              br={item.bedrooms}
              wr={item.bathrooms}
              id={item.id}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
      >
        &rarr;
      </button>
    </div>
  );
}

export default Scroll;
