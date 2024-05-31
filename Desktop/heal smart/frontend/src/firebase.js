// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAniOiO6bXl6yPwhd4ZFea7I0Xm7vMLFPQ",
  authDomain: "health-app-2058e.firebaseapp.com",
  projectId: "health-app-2058e",
  storageBucket: "health-app-2058e.appspot.com",
  messagingSenderId: "536037149148",
  appId: "1:536037149148:web:49f15e4c62f13f02962719",
  measurementId: "G-T9H5H9DX0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
 export {db};