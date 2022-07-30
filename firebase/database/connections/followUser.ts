import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore"
import { User } from "../../types/User"

import { db } from "../../firebaseConfig"
/* 
TODOS:
--> when someone taps the follow button, first it is checked on the frontend if the user is already followed by the user to exclude an unnecessary database call

--> if the user isn't followed and it is a valid user, then the user is added to the following list of the current user and the current user is added to the followers list of the user
*/

export const followUser = async (userId: string, userToFollowId: string) => {
  const currentUserDocRef = doc(db, "connections", userId)
  const userToFollowDocRef = doc(db, "connections", userToFollowId)

  try {
    //check if the user we want to follow is already followed of the current user
    const currentUserDoc = await getDoc(currentUserDocRef)
    const currentUserDocData = currentUserDoc.data()
    if (currentUserDocData) {
      if (currentUserDocData.following.includes(userToFollowId)) {
        throw new Error("User already followed")
      } else {
      }
    }
  } catch (error) {}
}

type UserConnectionsTypeResult = {
  following: Array<string>
  followers: Array<string>
}
