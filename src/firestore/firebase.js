import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPhoVbZrwpIMGwNcuMB7CxBtQVJxlW79A",
  authDomain: "study-buddy-f28dc.firebaseapp.com",
  projectId: "study-buddy-f28dc",
  storageBucket: "study-buddy-f28dc.appspot.com",
  messagingSenderId: "988903736852",
  appId: "1:988903736852:web:af70ff6bb4491a2a338901",
  measurementId: "G-ZJ7ZVJ1LGK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };