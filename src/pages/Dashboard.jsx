import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Input from '../component/Input'; // Ensure this path is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import SellHome from '../component/SellHome';
import RentHome from '../component/RentHome';
import Card from '../component/Card';
import OwnerList from '../component/Ownerlist';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  
  bgcolor: 'background.paper',
  border: '2px solid black',
  boxShadow: 24,
  
  borderRadius: '8px',
  maxHeight: '90vh', // Limit the height
  overflowY: 'auto', // Enable vertical scrolling
  width: '60%', // Set a responsive width
  maxWidth: '500px', // Max width for the modal
};

function Dashboard() {
  const [openSellModal, setOpenSellModal] = useState(false);
  const [openRentModal, setOpenRentModal] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
    profilePhoto: '',
  });

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserInfo(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, { ...userInfo });
        toast.success('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile.');
      }
    }
  };

  const defaultPhoto = userInfo.gender === 'Female' ? '/assests/female.png' : '/assests/male.png';
  const profilePhoto = userInfo.profilePhoto || defaultPhoto;

  return (
    <div>
<div className="flex flex-col md:flex-row mx-auto mt-16 p-6 w-full h-screen rounded-lg shadow-lg">
      {/* Profile Photo Section */}
      <div className="flex-shrink-0">
        <img 
          src={profilePhoto} 
          alt="Profile" 
          className="h-32 w-32 rounded-full border-4 border-gray-300 shadow-lg" 
        />
      </div>

      {/* User Info Form Section */}
      <div className="flex-grow  ml-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>

        <form onSubmit={handleUpdate} className="space-y-6  w-full ">
          <Input 
            label="Name" 
            placeholder="Enter your name" 
            value={userInfo.name} 
            setValue={(value) => setUserInfo({ ...userInfo, name: value })}
          />
          <Input 
            label="Email" 
            placeholder="Enter your email" 
            value={userInfo.email} 
            setValue={(value) => setUserInfo({ ...userInfo, email: value })}
            type="email" 
          />
          <Input 
            label="Address" 
            placeholder="Enter your address" 
            value={userInfo.address} 
            setValue={(value) => setUserInfo({ ...userInfo, address: value })}
          />
          <Input 
            label="Phone Number" 
            placeholder="Enter your phone number" 
            value={userInfo.phone} 
            setValue={(value) => setUserInfo({ ...userInfo, phone: value })}
            type="tel" 
          />
          
          {/* Gender Select Input */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-2 font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              value={userInfo.gender}
              onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
              className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-yellow-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-200 shadow-lg"
          >
            Update Profile
          </button>
        </form>
      
      </div>

      {/* Modal Button Section */}
      <div className="mt-4 flex flex-col gap-4 m-3 h-9">
        <Button 
          variant="contained" 
          color="black" 
          onClick={() => setOpenSellModal(true)} // Open the sell modal
          className="bg-black hover:bg-yellow-400 transition duration-200"
        >
          Want to sell home?
        </Button>
        <h2>OR</h2> 
        <Button 
          variant="contained" 
          color="black" 
          onClick={() => setOpenRentModal(true)} // Open the rent modal
          className="bg-black hover:bg-yellow-400 transition duration-200"
        >
          Want to rent home?
        </Button>
      </div>

      {/* Sell Home Modal */}
      <Modal
        open={openSellModal}
        onClose={() => setOpenSellModal(false)}
        aria-labelledby="sell-home-modal-title"
        aria-describedby="sell-home-modal-description"
      >
        <Box sx={style}>
          <SellHome />
        </Box>
      </Modal>

      {/* Rent Home Modal */}
      <Modal
        open={openRentModal}
        onClose={() => setOpenRentModal(false)}
        aria-labelledby="rent-home-modal-title"
        aria-describedby="rent-home-modal-description"
      >
        <Box sx={style}>
          <RentHome />
        </Box>
      </Modal>

      <ToastContainer />
    </div>
    <div className='   p-4 mt-0'>
    <h1 className=' text-5xl mt-5 text-black p-5 font-bold items-center'> Your List </h1>
      <OwnerList/>
    </div>

    </div>
    
  );
}

export default Dashboard;
