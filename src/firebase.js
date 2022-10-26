// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS7wrrk_YeJGUlgaXQZHiL8SVozSqqUeg",
  authDomain: "react-chat-app-ee88b.firebaseapp.com",
  projectId: "react-chat-app-ee88b",
  storageBucket: "react-chat-app-ee88b.appspot.com",
  messagingSenderId: "566654738905",
  appId: "1:566654738905:web:e3dc9f0e675ca1ff9279c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(); //creating db
