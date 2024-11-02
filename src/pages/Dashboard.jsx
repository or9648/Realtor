import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Input from '../component/Input'; // Ensure this path is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: '',
    profilePhoto: '', // Added to store profile photo URL
  });

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, 'users', user.uid); // Use the current user's uid
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserInfo(docSnap.data()); // Set the existing data
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
        const docRef = doc(db, 'users', user.uid); // Reference to the current user's document
        await updateDoc(docRef, { ...userInfo }); // Update the document with the new user info
        toast.success('Profile updated successfully!'); // Success notification
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile.'); // Error notification
      }
    }
  };

  // Determine default profile photo based on gender
  const defaultPhoto = userInfo.gender === 'Female' ? '/assests/female.png' : '/assests/male.png';
  const profilePhoto = userInfo.profilePhoto || defaultPhoto;

  return (
    <div className="flex flex-col md:flex-row mx-auto mt-16 p-4 w-full">
      {/* Profile Photo Section */}
      <div className="flex-shrink-0">
        <img 
          src={profilePhoto} 
          alt="Profile" 
          className="h-24 w-24 rounded-full border-2 border-gray-300" 
        />
      </div>

      {/* User Info Form Section */}
      <div className="flex-grow ml-4">
        <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
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
            <label htmlFor="gender" className="mb-2 font-medium">Gender</label>
            <select
              id="gender"
              value={userInfo.gender}
              onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
              className="border rounded py-2 px-3"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Modal Button Section */}
      <div className=" mt-4">
        <Button variant="contained" onClick={handleOpen}>
         want to sell/rent home?
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
