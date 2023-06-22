import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBKri49Y0RbZ2jQ0jbNfMyes5CCptTrRSc",
  authDomain: "jobcompass-frontend.firebaseapp.com",
  projectId: "jobcompass-frontend",
  storageBucket: "jobcompass-frontend.appspot.com",
  messagingSenderId: "976441790282",
  appId: "1:976441790282:web:e2ae4be03c904ee089fbb3",
  measurementId: "G-G12LC0KJFV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};