// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX7AiezKXp98z8NLVCKxvQ8Tk-5DU2CKA",
  authDomain: "zavrsnirad-10e89.firebaseapp.com",
  projectId: "zavrsnirad-10e89",
  storageBucket: "zavrsnirad-10e89.appspot.com",
  messagingSenderId: "78988022972",
  appId: "1:78988022972:web:95ca81f796bc95f1a8acb9",
  measurementId: "G-9WBL81M7Z8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
