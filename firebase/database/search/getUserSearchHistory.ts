import { db } from "../../firebaseConfig"
import { getDoc, doc } from "firebase/firestore"

export const getUsersSearchHistory = async (uid: string): Promise<any> => {
  const docRef = doc(db, "searchHistory", uid)
  let data
  try {
    const response = await getDoc(docRef)
    data = response.data()
  } catch (error: any) {
    console.log(error.message)
    throw new Error("Failed to get search history")
  }
  return data?.users
}
