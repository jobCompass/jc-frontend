// Import the functions you need from the SDKs you need
import {auth, db} from "./fbconfig";
import {type Error} from './pototype';
// import * as dotenv from 'dotenv';
import
  {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from "firebase/auth";
import {collection, addDoc } from "firebase/firestore";
import axios from "axios";
// import * as dotenv from 'dotenv';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// dotenv.config();
const server = 'https://app-6lov3rzemq-uc.a.run.app';
const temp = 'http://127.0.0.1:5001/jobcampass-server/us-central1/app'

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log('user',user);
    const check = await axios.post(`${temp}/login/${user.uid}`, user)
    if (check.status === 204) {
      return {id: user.uid, name: user.displayName, email:user.email}
    } else {
      return 'exist';
    }
  } catch (err:Error) {
    console.log(err.code,'msg',err.message);
    if(err.code !== 'auth/popup-closed-by-user') {
      alert(err);
    }

  }
};

const logInWithEmailAndPassword = async (email:string, password:string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

const registerWithEmailAndPassword = async (name:string, email:string, password:string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

const sendPasswordReset = async (email:string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};