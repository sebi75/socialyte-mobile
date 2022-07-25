import { db } from "../../firebaseConfig"
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { User } from "../../types/User"
export const getUsersSearchHistory = async (
  uid: string
): Promise<UserSearchHistoryResults> => {
  const docRef = doc(db, "searchHistory", uid)
  const usersCollection = collection(db, "users")
  let returnedData
  try {
    const userDoc = await getDoc(docRef)
    const userDocData = userDoc.data()
    const ids: Array<string> = userDocData?.users.map(
      (object: any) => object.uid
    )

    const q = query(usersCollection, where("uid", "in", ids))
    const userDocs = await getDocs(q)
    const userDocsData = userDocs.docs.map((doc: any) => doc.data())
    //construct the data we need to return
    returnedData = userDocsData.map((user: User) => ({
      uid: user.uid,
      photoURL: user.profilePicture || "",
      username: user.username || "",
      description: user.description || "",
    }))
  } catch (error: any) {
    console.log(error.message)
    throw new Error("Failed to get search history")
  }
  return returnedData
}

export type UserSearchHistoryResults = UserResult[]

interface UserResult {
  uid: string
  photoURL: string
  username: string
  description: string
}
