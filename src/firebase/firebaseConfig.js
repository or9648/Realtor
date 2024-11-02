// Import the necessary Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

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
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);
const storage = getStorage(app);
 const auth = getAuth(app);

// Export Firebase services
export { app, analytics, auth, db, storage };
