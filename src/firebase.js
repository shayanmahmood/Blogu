// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLPG7OwLlF4wLu75Eo4G0NNx6brKNqpa0",
  authDomain: "inklo-91428.firebaseapp.com",
  projectId: "inklo-91428",
  storageBucket: "inklo-91428.appspot.com",
  messagingSenderId: "853499145092",
  appId: "1:853499145092:web:1e28b8a19bd7ae4492cbd1",
  measurementId: "G-MXM9V0K4ZF"
};

// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }



