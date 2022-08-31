import { db } from "../../firebaseConfig"
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  increment,
} from "firebase/firestore"

export const likePostOperation = async (
  postId: string,
  userId: string,
  type: "like" | "unlike"
): Promise<void> => {
  const postDocRef = doc(db, "media", postId)

  if (type == "like") {
    await updateDoc(postDocRef, {
      likes: arrayUnion(userId),
      numOfLikes: increment(1),
    })
  } else {
    await updateDoc(postDocRef, {
      likes: arrayRemove(userId),
      numOfLikes: increment(-1),
    })
  }
}
