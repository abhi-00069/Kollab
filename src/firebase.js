// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0M4GuOO409RWpjLsnq_PoYN_sH_-l-aY",
  authDomain: "kollab-33fb7.firebaseapp.com",
  projectId: "kollab-33fb7",
  storageBucket: "kollab-33fb7.firebasestorage.app",
  messagingSenderId: "513970061161",
  appId: "1:513970061161:web:5ead7dbfe87518875107f8",
  measurementId: "G-HPBNP0GSZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// http://localhost:5173/
