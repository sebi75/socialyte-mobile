import { getDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { User } from "../../types/User"

export const getUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid)
  try {
    const response = await getDoc(docRef)
    const data = response.data()
    return data as User
  } catch (error) {
    console.log("error in getting the user document from the db")
  }
}
