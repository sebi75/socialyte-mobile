import { db } from "../firebaseConfig"
import { doc, setDoc, addDoc, collection } from "firebase/firestore"

export const createUserDocumentAtSignup = async (
  uid: string,
  email: string,
  username: string
) => {
  const docRef = doc(db, "users", uid)

  try {
    await setDoc(docRef, {
      uid,
      email,
      username,
    })
  } catch (error) {
    throw Error(
      "An error occured when creating a new document for new signed up user"
    )
  }
}
