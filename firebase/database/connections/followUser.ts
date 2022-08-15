import { updateDoc, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"

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
          numberOfFollowings: currentUserDocData.numberOfFollowings + 1,
        })

        const userToFollowDoc = await getDoc(userToFollowDocRef)
        const userToFollowDocData = userToFollowDoc.data()
        if (userToFollowDocData) {
          await updateDoc(userToFollowDocRef, {
            followers: [...userToFollowDocData.followers, userId],
            numberOfFollowers: userToFollowDocData.numberOfFollowers + 1,
          })
        } else {
          throw new Error("User to follow doesn't exist")
        }
      }
    }
  } catch (error: any) {
    console.log(error.message)
    throw new Error("error following user", error)
  }
}
