import { collection, doc, addDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"

export const addComment = async (
  comment: string,
  uid: string,
  postId: string
): Promise<void> => {
  const postDocRef = doc(db, "media", postId)

  const commentsCollectionRef = collection(postDocRef, "comments")

  try {
    await addDoc(commentsCollectionRef, {
      comment: comment,
      uid: uid,
      createdAt: Date.now(),
    })
  } catch (error: any) {
    throw new Error("error adding comment", error)
  }
}
