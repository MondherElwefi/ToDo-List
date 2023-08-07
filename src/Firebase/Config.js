// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYrdJPD_89QB9phevBcH-K_vPJ-kam4cw",
  authDomain: "sajel-a6e0a.firebaseapp.com",
  projectId: "sajel-a6e0a",
  storageBucket: "sajel-a6e0a.appspot.com",
  messagingSenderId: "3010303206",
  appId: "1:3010303206:web:607cd32f68276870fc1727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);