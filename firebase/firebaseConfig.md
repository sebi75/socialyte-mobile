##FILE CONFIGURATION FOR:
firebaseConfig.ts

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
        ...place your own firebase config here...
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage()
