import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLqyjbI7GTK0GOQjErLgmhtMNQyAa-hmI",
  authDomain: "farewell-website-29c67.firebaseapp.com",
  projectId: "farewell-website-29c67",
  storageBucket: "farewell-website-29c67.firebasestorage.app",
  messagingSenderId: "102184151353",
  appId: "1:102184151353:web:4b2a93779490f78fd0a0e8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
