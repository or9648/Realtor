// ownerListService.js
import { db } from '../firebase/firebaseConfig'; // Ensure this path is correct
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getOwnerListByUid(uid) {
  try {
    const q = query(collection(db, 'ownerlist'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    const ownerList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return ownerList;
  } catch (error) {
    console.error('Error fetching owner list:', error);
    throw error;
  }
}
