// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFUcXExQwF-XeU32W_EcHlqyEmARKQQM0",
  authDomain: "night-owl-resources-757d9.firebaseapp.com",
  projectId: "night-owl-resources-757d9",
  storageBucket: "night-owl-resources-757d9.appspot.com",
  messagingSenderId: "512556298525",
  appId: "1:512556298525:web:b9252cb152d9e65f3931f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app)
export const fireStorage = getStorage(app)
export const auth = getAuth(app)