// Import the necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // For file storage

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6VrGmIUBm0AmRlrblf3Rr8Kc6D1WYQss",
  authDomain: "realtor-f0b22.firebaseapp.com",
  projectId: "realtor-f0b22",
  storageBucket: "realtor-f0b22.appspot.com",
  messagingSenderId: "206618784168",
  appId: "1:206618784168:web:64c096ab246b53fb03ed9d",
  measurementId: "G-4SG662PZ7C"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize individual services
const analytics = getAnalytics(app); 
const auth = getAuth(app); // For Firebase Authentication
const db = getFirestore(app); // For Firebase Firestore
const storage = getStorage(app); // For Firebase Storage (optional)

// Export Firebase services for use in your app
export { app, analytics, auth, db, storage };
