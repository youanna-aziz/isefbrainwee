// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { getStorage } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

// ❗️بدّلي القيم دي بـ config بتاع مشروعك من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxb4Ihjf8Umexi5QB1jXq-CEZit5loQHs",
  authDomain: "final-isef.firebaseapp.com",
  projectId: "final-isef",
  storageBucket: "final-isef.firebasestorage.app",
  messagingSenderId: "77650497912",
  appId: "1:77650497912:web:072bff215595427f93f88d",
  measurementId: "G-EE14ZMWWPZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
