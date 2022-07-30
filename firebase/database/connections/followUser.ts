import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore"

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
        //add the user to the following list of the current user
        //and the current user is added to the followers list of the user
        await updateDoc(currentUserDocRef, {
          following: [...currentUserDocData.following, userToFollowId],
        })

        const userToFollowDoc = await getDoc(userToFollowDocRef)
        const userToFollowDocData = userToFollowDoc.data()
        if (userToFollowDocData) {
          await updateDoc(userToFollowDocRef, {
            followers: [...userToFollowDocData.followers, userId],
          })
        } else {
          throw new Error("User to follow doesn't exist")
        }
      }
    }
  } catch (error) {}
}

type UserConnectionsTypeResult = {
  following: Array<string>
  followers: Array<string>
}
