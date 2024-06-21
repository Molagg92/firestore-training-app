import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBBheYuIRyGkKeabmVCj29jZG686DT3FXY",
  authDomain: "firestore-training-app.firebaseapp.com",
  projectId: "firestore-training-app",
  storageBucket: "firestore-training-app.appspot.com",
  messagingSenderId: "783096074223",
  appId: "1:783096074223:web:bc576d6ace7beff495301a"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();