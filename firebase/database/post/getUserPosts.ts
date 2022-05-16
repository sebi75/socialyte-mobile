import { db } from "../../firebaseConfig"
import {
  getDocs,
  updateDoc,
  doc,
  collection,
  where,
  query,
} from "firebase/firestore"

//this function creates the post in the
export const getUserPosts = async (uid: string) => {
  const collectionRef = collection(db, "media")
  const q = query(collectionRef, where("postOwner", "==", uid))

  try {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc: any) => {
      console.log(doc.data())
    })
  } catch (error) {}
}
