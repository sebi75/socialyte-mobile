import { db } from "../../firebaseConfig"
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore"

export const addToSearchHistory = async (
  uid: string,
  userUid: string
): Promise<any> => {
  let status = undefined
  const docRef = doc(db, "searchHistory", uid)

  //first check if the user searched isn't already in
  //the search history
  const response = await getDoc(docRef)
  const data = response.data()
  if (data?.users.some((user: any) => user.uid === userUid)) {
    status = "already in search history"
    return status
  }

  const newItem = {
    uid: userUid,
  }

  try {
    const response = await updateDoc(docRef, {
      users: arrayUnion(newItem),
    })
    status = "success"
  } catch (error: any) {
    status = "failed"
    console.log(error.message)
    throw new Error("Failed to add to search history")
  }
  return status
}
