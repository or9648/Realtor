// OwnerList.js
import React, { useState, useEffect } from 'react';
import { getOwnerListByUid } from '../function/ownerlist';
import { auth } from '../firebase/firebaseConfig'; // Ensure this path is correct
import Card from './Card'; // Ensure Card component path is correct

function OwnerList() {
  const [ownerList, setOwnerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerList = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.warn('User is not authenticated');
          return;
        }
        const data = await getOwnerListByUid(user.uid);
        setOwnerList(data);
      } catch (error) {
        console.error('Error fetching owner list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerList();
  }, []);

  const handleEdit = () => {
    // Logic for editing the item
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    // Logic for deleting the item
    console.log('Delete clicked');
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {ownerList.length > 0 ? (
        ownerList.map((item) => (
          <Card
            key={item.id}
        type={item.type ? ` ${item.type}` : 'No type'}
            address={item.address || 'No address available'}
            image={item.image} // Assuming 'image' field holds the image URL
            buttonText="View Details"
            onButtonClick={() => alert(`Viewing details for ${item.bhk ? `${item.bhk} BHK` : 'this property'}`)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            price={item.price} 
             br={item.bedrooms}
             wr= {item.bathrooms}
              id={item.id}
          />
        ))
      ) : (
        <p className="text-gray-400">No items found</p>
      )}
    </div>
  );
}

export default OwnerList;
