import { db, auth } from '../firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

export async function getOwnerListByUid() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Reference to the 'housedetails' subcollection under the authenticated user's UID
    const housedetailsRef = collection(db, 'ownerlist', user.uid, 'housedetails');
    const querySnapshot = await getDocs(housedetailsRef);

    // Map each document data along with its ID
    const ownerList = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Adding the document ID as a unique identifier
      ...doc.data(),
    }));

    return ownerList; // Returns an array of house details specific to the user
  } catch (error) {
    console.error('Error fetching owner list:', error);
    throw error; // Ensure the error can be caught in the calling function
  }
}
