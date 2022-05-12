// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABRwLUHEGKsrxofFITuYdb-OygszBkdiM",
  authDomain: "socialyte-baas.firebaseapp.com",
  projectId: "socialyte-baas",
  storageBucket: "socialyte-baas.appspot.com",
  messagingSenderId: "557203487394",
  appId: "1:557203487394:web:b19f77b696e1a93615f5fb",
  measurementId: "G-S7E2B8CHHC",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
