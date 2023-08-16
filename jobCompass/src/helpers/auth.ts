// Import the functions you need from the SDKs you need
import {auth, db} from "./fbconfig";

// import * as dotenv from 'dotenv';
import
  {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut,
    User,

  } from "firebase/auth";
import {collection, addDoc } from "firebase/firestore";
import axios from "axios";
import { FirebaseError } from "firebase/app";

const server = import.meta.env.VITE_SERVER;
// const server = 'http://127.0.0.1:5001/jobcampass-server/us-central1/app'

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const check = await axios.post(`${server}/login/${user.uid}`, user);

    return check.data;
  } catch (err) {
    if (err instanceof FirebaseError && err.code !== 'auth/popup-closed-by-user') {
      alert(err);
    }
  }
};

const logInWithEmailAndPassword = async (email:string, password:string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    if (err instanceof FirebaseError) {
      return err.code
    }
  }
};

const registerWithEmailAndPassword = async (name:string, email:string, password:string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user)
    const addtoDb = await axios.post(`${server}/user`, {uid: user.uid, email: email, displayName: name, photoURL: null})
    if (addtoDb && addtoDb.status === 201) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.message)
      return error.code
    }
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
const handleAuthChanged = (cb: (user: User | null) => void) => {
  return onAuthStateChanged(auth, cb)
}
const logout = async () => {
  signOut(auth)
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  handleAuthChanged,
  sendPasswordReset,
  logout,
};