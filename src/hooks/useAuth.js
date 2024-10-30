// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig'; // Import your Firebase auth

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser };
};
