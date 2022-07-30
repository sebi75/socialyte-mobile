import { arrayRemove, getDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"

export const unfollowUser = async (id: string, userToUnfollowId: string) => {
  const userDocRef = doc(db, "connections", id)
  const userToUnfollowDocRef = doc(db, "connections", userToUnfollowId)

  //remove the userId in the userDocRefData "following" aray
  // and from the userToUnfollowDocRefData "followers" array

  try {
    await updateDoc(userDocRef, {
      following: arrayRemove(userToUnfollowDocRef),
    })

    await updateDoc(userToUnfollowDocRef, {
      followrs: arrayRemove(userDocRef),
    })
  } catch (error: any) {
    throw new Error("error in unfollowing the user")
  }
}
