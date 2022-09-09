// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "uncannabi.firebaseapp.com",
  projectId: "uncannabi",
  storageBucket: "uncannabi.appspot.com",
  messagingSenderId: "531464551816",
  appId: "1:531464551816:web:314c06fcda8f97ce4f4e3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
