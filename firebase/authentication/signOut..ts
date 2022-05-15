import { auth } from "../firebaseConfig"
import { signOut as signOutFirebase } from "firebase/auth"

export const signOut = async () => {
  try {
    await signOutFirebase(auth)
  } catch (error) {
    console.log(error)
  }
}
