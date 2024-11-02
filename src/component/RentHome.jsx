import React, { useState } from 'react';
import Input from '../component/Input'; // Ensure this path is correct
import { addHouseDetails } from '../function/sellrent'; // Adjust the path accordingly
import { toast } from 'react-toastify';
import { storage } from '../firebase/firebaseConfig'; // Firebase storage configuration
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function RentHome() {
  const [houseDetails, setHouseDetails] = useState({
    bhk: '',
    bathrooms: '',
    address: '',
    price: '',
    offer: '',
    discount: '',
    image: null,
  });
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setHouseDetails({ ...houseDetails, image: file });
    } else {
      toast.error('Please upload an image file (PNG, JPG, JPEG).');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!houseDetails.image) {
      toast.error('Please upload an image');
      return;
    }

    try {
      setUploading(true);

      // Firebase storage path
      const fileRef = ref(storage, `images/${houseDetails.image.name}`);
      const uploadTask = uploadBytesResumable(fileRef, houseDetails.image);

      // Track the upload progress
      uploadTask.on(
        'state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          setUploading(false);
          console.error('Upload failed:', error);
          toast.error('Failed to upload image.');
        },
        async () => {
          // Handle successful upload
          const downloadURL = await getDownloadURL(fileRef);
          console.log('File available at', downloadURL);

          // Add house details with the image URL to Firestore
          await addHouseDetails({ ...houseDetails, image: downloadURL }, 'rent');
          toast.success('House details submitted successfully for rent!');

          // Reset the form
          setHouseDetails({
            bhk: '',
            bathrooms: '',
            address: '',
            price: '',
            offer: '',
            discount: '',
            image: null,
          });
          setUploading(false);
        }
      );
    } catch (error) {
      setUploading(false);
      toast.error('Failed to submit house details for rent.');
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-10 p-4 bg-gray-100'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Want to Rent a Home?</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4">
        <Input
          label="BHK"
          placeholder="Enter number of BHK"
          value={houseDetails.bhk}
          setValue={(value) => setHouseDetails({ ...houseDetails, bhk: value })}
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
          label="Offer"
          placeholder="Enter offer details"
          value={houseDetails.offer}
          setValue={(value) => setHouseDetails({ ...houseDetails, offer: value })}
        />
        <Input
          label="Discount (%)"
          placeholder="Enter discount percentage"
          value={houseDetails.discount}
          setValue={(value) => setHouseDetails({ ...houseDetails, discount: value })}
          type="number"
        />

        {/* Image Upload Input */}
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
        
        <button
          type="submit"
          className={`w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200 shadow-lg ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default RentHome;
