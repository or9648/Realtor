import React, { useState } from 'react';
import Input from '../component/Input';
import { addHouseDetails } from '../function/sellrent';
import { storage } from '../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebaseConfig';

function SellHome() {
  const [houseDetails, setHouseDetails] = useState({
    bedrooms: '',
    bathrooms: '',
    address: '',
    price: '',
    propertyType: '',
    condition: '',
     type:'sell',
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setHouseDetails({ ...houseDetails, image: file });
    } else {
      e.target.value = null; // Clear the invalid file input
      toast.error('Please upload an image file (PNG, JPG, JPEG).');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!houseDetails.image) {
      toast.error('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("User not authenticated");
        setLoading(false);
        return;
      }

      const fileRef = ref(storage, `images/${user.uid}/${Date.now()}_${houseDetails.image.name}`);
      const uploadTask = uploadBytesResumable(fileRef, houseDetails.image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.info(`Upload is ${Math.round(progress)}% done`, { autoClose: 500 });
        },
        (error) => {
          console.error('Upload failed:', error);
          setLoading(false);
          toast.error('Failed to upload image.');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addHouseDetails({
            ...houseDetails,
            image: downloadURL,
            uid: user.uid,
          });
          toast.success('House details submitted successfully for sale!');
          setHouseDetails({
            bedrooms: '',
            bathrooms: '',
            address: '',
            price: '',
            propertyType: '',
            condition: '',
            type:"sell",
            image: null,
          });
          document.getElementById('image').value = null; // Clear the file input
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setLoading(false);
      toast.error('Failed to submit house details for sale.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10 p-4 bg-gray-100'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Want to Sell Your Home?</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4">
        <Input
          label="Bedrooms"
          placeholder="Enter number of bedrooms"
          value={houseDetails.bedrooms}
          setValue={(value) => setHouseDetails({ ...houseDetails, bedrooms: value })}
          type="number"
          required
        />
        <Input
          label="Bathrooms"
          placeholder="Enter number of bathrooms"
          value={houseDetails.bathrooms}
          setValue={(value) => setHouseDetails({ ...houseDetails, bathrooms: value })}
          type="number"
          required
        />
        <Input
          label="Address"
          placeholder="Enter the address"
          value={houseDetails.address}
          setValue={(value) => setHouseDetails({ ...houseDetails, address: value })}
          required
        />
        <Input
          label="Price"
          placeholder="Enter the price"
          value={houseDetails.price}
          setValue={(value) => setHouseDetails({ ...houseDetails, price: value })}
          type="number"
          required
        />
        <Input
          label="Property Type"
          placeholder="Enter property type (e.g., Apartment, Villa)"
          value={houseDetails.propertyType}
          setValue={(value) => setHouseDetails({ ...houseDetails, propertyType: value })}
          required
        />
        <Input
          label="Condition"
          placeholder="Enter property condition (e.g., New, Used)"
          value={houseDetails.condition}
          setValue={(value) => setHouseDetails({ ...houseDetails, condition: value })}
          required
        />

        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-yellow-300"
            required
          />
        </div>

        {loading && (
          <div className="text-center mt-4 text-yellow-500">
            <p>Uploading...</p>
            <div className="flex justify-center items-center mt-2">
              <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-yellow-500 rounded-full"></div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200 shadow-lg"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default SellHome;
