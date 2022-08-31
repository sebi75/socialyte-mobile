import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { LikePreview } from "../../types"
import store from "../../../state/store"

export const getLikesPreviews = async (
  postId: string
): Promise<LikePreview[]> => {
  const usersCollectionref = collection(db, "users")

  const uids =
    store.getState().userFeed.posts.find((post) => post.postId === postId)
      ?.likes || []
  if (uids.length === 0) {
    return []
  }

  try {
    const q = query(usersCollectionref, where("uid", "in", uids))
    const docsSnapshot = await getDocs(q)
    const likesPreviews = docsSnapshot.docs.map((doc) => {
      return {
        uid: doc.data().uid,
        profilePicture: doc.data().profilePicture,
        username: doc.data().username,
      }
    })

    console.log({ message: likesPreviews })
    return likesPreviews
  } catch (error: any) {
    throw new Error("error getting the comments", error)
  }
}
