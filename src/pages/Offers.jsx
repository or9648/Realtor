import { useEffect, useState } from 'react';
import { getListById } from '../function/all';
import Card from '../component/Card';

function Offers() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // State to track the selected type

  useEffect(() => {
    async function fetchData() {
      try {
        const items = await getListById();
        setProperties(items);
        setFilteredProperties(items); // Initially show all properties
        console.log(items); // Logs all fetched properties
      } catch (error) {
        console.error("Error loading properties:", error);
      }
    }
    fetchData();
  }, []);

  // Filter properties based on selected type
  const handleFilter = (type) => {
    setSelectedType(type);
    if (type) {
      setFilteredProperties(properties.filter(item => item.type === type));
    } else {
      setFilteredProperties(properties); // Show all properties if no filter is selected
    }
  };

  const handleEdit = (id) => {
    alert(`Edit property with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete property with ID: ${id}`);
  };

  return (
    <div className='mt-14 p-10'>
      <div className='flex flex-row justify-center items-center p-5 gap-5'>
        <button 
          className={`bg-gray-900 text-white h-10 w-36 rounded-lg transition-all duration-200 shadow-lg ${selectedType === 'sell' ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 '}`}
          onClick={() => handleFilter('sell')}
        >
          Sell
        </button>
        <button 
          className={`bg-gray-900 text-white h-10 w-36 rounded-lg transition-all duration-200 shadow-lg ${selectedType === 'rent' ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 '}`}
          onClick={() => handleFilter('rent')}
        >
          Rent
        </button>
      </div>

      {/* Dynamic Heading based on selected filter */}
      <h2 className="text-center text-2xl font-bold text-gray-800 mt-8">
        {selectedType === 'sell' && "Sell Properties"}
        {selectedType === 'rent' && "Rent Properties"}
        {!selectedType && "All Properties"}
      </h2>

      <div className="property-list grid grid-cols-1 p-8 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-6">
        {filteredProperties.map((item) => (
          <Card
            key={item.id}
            type={item.type || 'No type'}
            address={item.address || 'No address available'}
            image={item.image} // Assuming 'image' field holds the image URL
            buttonText="View Details"
            onButtonClick={() => alert(`Viewing details for ${item.bhk ? `${item.bhk} BHK` : 'this property'}`)}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
            price={item.price} 
            br={item.bedrooms}
            wr={item.bathrooms}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Offers;
