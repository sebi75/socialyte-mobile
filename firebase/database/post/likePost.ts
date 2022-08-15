import { db } from "../../firebaseConfig"
import { updateDoc, arrayUnion, arrayRemove, doc } from "firebase/firestore"

export const likePostOperation = async (
  postId: string,
  userId: string,
  type: "like" | "unlike"
) => {
  const postDocRef = doc(db, "media", postId)

  if (type == "like") {
    await updateDoc(postDocRef, {
      likes: arrayUnion(userId),
    })
  } else {
    await updateDoc(postDocRef, {
      likes: arrayRemove(userId),
    })
  }
}
