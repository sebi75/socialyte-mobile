import { collection, doc, limit, query, getDocs } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { Comment } from "../../types"

export const getComments = async (postId: string): Promise<Comment[]> => {
  const postDocRef = doc(db, "media", postId)

  const commentsCollectionRef = collection(postDocRef, "comments")

  try {
    const q = query(commentsCollectionRef, limit(5))
    const docsSnapshot = await getDocs(q)
    const comments = docsSnapshot.docs.map((doc) => {
      return {
        comment: doc.data().comment,
        uid: doc.data().uid,
        commentId: doc.id,
      }
    })

    return comments
  } catch (error: any) {
    throw new Error("error getting the comments", error)
  }
}
