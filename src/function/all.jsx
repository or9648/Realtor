import { db } from '../firebase/firebaseConfig'; 
import { collectionGroup, getDocs } from 'firebase/firestore';

export async function getListById() {
  try {
    // Use a collection group query to get all documents within all 'housedetails' subcollections
    const querySnapshot = await getDocs(collectionGroup(db, 'housedetails'));

    // Map each document to include its ID and data
    const propertyList = querySnapshot.docs.map(doc => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data from housedetails
    }));

    return propertyList; // Returns a list of all housedetails across all uids
  } catch (error) {
    console.error('Error fetching property list:', error);
    throw error; // Re-throws error to allow handling in calling functions
  }
}
