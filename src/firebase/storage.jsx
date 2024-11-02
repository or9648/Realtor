import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './path/to/firebaseConfig';

// Example usage in your component
const fileRef = ref(storage, `images/${houseDetails.image.name}`);
const uploadTask = uploadBytes(fileRef, houseDetails.image);

// Then retrieve download URL
getDownloadURL(uploadTask.ref).then((url) => {
  console.log('File available at:', url);
});
