import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListById } from '../function/getall'; // Adjust the path as necessary
import { FaBed, FaBath, FaHome, FaDollarSign, FaTags } from 'react-icons/fa'; // Importing icons

function Category() {
  const { id } = useParams(); // Get the property ID from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyList = await getListById(); // Fetch the list of properties
        const propertyData = propertyList.find(item => item.id.trim() === id.trim());

        if (propertyData) {
          setData(propertyData); // Set the specific property data
        } else {
          throw new Error('Property not found'); // Throw an error if not found
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (!data) return <div className="text-center text-white">No data found for this property.</div>;

  return (
    <div className="bg-gray-800 h-[600px] p-2 md:p-8 mt-14 flex flex-col md:flex-row gap-8 text-gray-200 ">
      <div className="flex-shrink-0 w-full md:w-1/2">
        <img 
          src={data.image} 
          className="w-full h-64 md:h-[400px] rounded-lg shadow-lg object-cover" 
          alt="Property" 
        />
        <div className="mt-4">
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-2 flex items-center">
            <FaHome className="mr-2" /> 
            Property Type:
            <span className="font-normal text-yellow-300">{data.type === 'sell' ? ' For Sale' : ' For Rent'}</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2">
        <p className="mb-4">
          <span className="font-bold text-yellow-400 text-2xl md:text-3xl">Address:</span>
          <br />
          <span className="font-normal text-lg md:text-xl">{data.address}</span>
        </p>

        {data.type === 'sell' ? (
          <>
            <DetailItem icon={FaBed} label="Bedrooms" value={data.bedrooms} />
            <DetailItem icon={FaBath} label="Bathrooms" value={data.bathrooms} />
            <DetailItem label="Condition" value={data.condition} />
            <DetailItem icon={FaDollarSign} label="Price" value={`$${data.price}`} />
            <DetailItem label="Property Type" value="For Sale" />
          </>
        ) : data.type === 'rent' ? (
          <>
            <DetailItem icon={FaBed} label="Bedrooms" value={data.bedrooms} />
            <DetailItem icon={FaBath} label="Bathrooms" value={data.bathrooms} />
            <DetailItem label="BHK" value={data.bhk} />
            <DetailItem label="Discount" value={data.discount} />
            <DetailItem icon={FaTags} label="Offer" value={data.offer} />
            <DetailItem icon={FaDollarSign} label="Price" value={`$${data.price}`} />
          </>
        ) : (
          <p className="text-red-500">Unknown property type.</p>
        )}
      </div>
    </div>
  );
}

// Separate DetailItem component for cleaner code
const DetailItem = ({ icon: Icon, label, value }) => (
  <p className="mb-4 flex items-start md:items-center flex-col md:flex-row">
    {Icon && <Icon className="mr-2 text-yellow-400 text-xl md:text-2xl" />}
    <span className="font-bold text-yellow-400 text-xl md:text-3xl">{label}:</span>
    <span className="font-normal text-lg md:text-xl ml-0 md:ml-2">{value}</span>
  </p>
);

export default Category;
