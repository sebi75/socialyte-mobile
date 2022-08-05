import { arrayRemove, getDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"

export const unfollowUser = async (id: string, userToUnfollowId: string) => {
  const userDocRef = doc(db, "connections", id)
  const userToUnfollowDocRef = doc(db, "connections", userToUnfollowId)

  //remove the userId in the userDocRefData "following" aray
  // and from the userToUnfollowDocRefData "followers" array

  try {
    const currentUserDoc = await getDoc(userDocRef)
    const currentUserDocData: any = currentUserDoc.data()
    await updateDoc(userDocRef, {
      following: arrayRemove(userToUnfollowId),
      numberOfFollowings: currentUserDocData.numberOfFollowings - 1,
    })
    const userToUnfollowDoc = await getDoc(userToUnfollowDocRef)
    const userToUnfollowDocData: any = userToUnfollowDoc.data()
    await updateDoc(userToUnfollowDocRef, {
      followers: arrayRemove(id),
      numberOfFollowers: userToUnfollowDocData.numberOfFollowers - 1,
    })
  } catch (error: any) {
    throw new Error("error in unfollowing the user")
  }
}
