import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"

export type UserConnectionType = "following" | "followers"

/* 
LOGIC: when someone visits profile we need to know if the user is following or not
the user, and having the user's followers and following list we can format better
and can display buttons properly (follow/unfollow)
*/

export const getUserFollowIds = async (
  userId: string,
  type: UserConnectionType
): Promise<string[]> => {
  const docRef = doc(db, "connections", userId)
  try {
    const response = await getDoc(docRef)
    const documentResponseData = response.data()
    console.log("response in firebase function: ", documentResponseData)
    if (documentResponseData) {
      console.log("this is what we return: ", documentResponseData[type])
      return documentResponseData[type]
    }
  } catch (error) {
    console.log("error in getting the user document from the db")
  }
  return []
}
