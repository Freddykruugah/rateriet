import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-ubszsjlzD9JRotlHvM_x2mMaEQDX5e4",
  authDomain: "rateriet.firebaseapp.com",
  projectId: "rateriet",
  storageBucket: "rateriet.firebasestorage.app",
  messagingSenderId: "579237497952",
  appId: "1:579237497952:web:67478ea157295117158705",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
