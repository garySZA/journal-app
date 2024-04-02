// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZ-xEtDA-494dmTMpfRe51wxMJkARAyIE",
    authDomain: "react-journal-app-28445.firebaseapp.com",
    projectId: "react-journal-app-28445",
    storageBucket: "react-journal-app-28445.appspot.com",
    messagingSenderId: "959255334917",
    appId: "1:959255334917:web:0312995a65bceedf1e8c6c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );