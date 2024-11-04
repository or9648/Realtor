// Import necessary functions from Firebase
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Firestore configuration import

// Function to add house details to Firestore under a user's UID
export const addHouseDetails = async (houseDetails) => {
  try {
    const { uid, ...details } = houseDetails; // Destructure uid from houseDetails

    if (!uid) {
      throw new Error("UID is required to add house details.");
    }

    // Reference the subcollection "housedetails" under the user's UID
    const docRef = doc(collection(db, "ownerlist", uid, "housedetails"), `${details.address}-${Date.now()}`);

    // Save the details to Firestore
    await setDoc(docRef, details);

    console.log("House details successfully added!");
  } catch (error) {
    console.error("Error adding house details:", error);
    throw error;
  }
};
