/** @format */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZgzqnuLOiBSy8TACvduMB9P-v2HO0sEI",
  authDomain: "faq-firebase-6e85b.firebaseapp.com",
  projectId: "faq-firebase-6e85b",
  storageBucket: "faq-firebase-6e85b.appspot.com",
  messagingSenderId: "231162639396",
  appId: "1:231162639396:web:8e4ca494b42c3d4dbf94b1",
};
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export default firestore;
