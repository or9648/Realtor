// Import necessary functions from Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Firestore configuration import

// Function to add house details to Firestore
export const addHouseDetails = async (houseDetails, collectionName) => {
  try {
    // Create a reference to the document with an auto-generated ID
    const docRef = doc(db, collectionName, `${houseDetails.address}-${Date.now()}`);

    // Save the details to Firestore
    await setDoc(docRef, houseDetails);

    console.log("House details successfully added!");
  } catch (error) {
    console.error("Error adding house details:", error);
    throw error;
  }
};
