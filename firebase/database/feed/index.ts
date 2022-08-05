import { db } from "../../firebaseConfig"
import {
  getDocs,
  collection,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore"

import { Post } from "../../../state/types/Post"
import { formatDate } from "../../../utils/formatDate"

type GetUserPostsResult = Array<Post>

//this function creates the post in the state
export const getUserFeed = async (uid: string): Promise<GetUserPostsResult> => {
  let posts: Array<Post> = []
  const collectionRef = collection(db, "media")
  const userIdsDocument = await getDoc(doc(db, "connections", uid))
  const userIdsData = userIdsDocument.data()
  const userIds = userIdsData?.followingIds || []

  const q = query(collectionRef, where("postOwner", "in", userIds))

  try {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      //same as the post
      const post = doc.data()
      post.createdAt = formatDate(new Date(post.createdAt.toDate()))
      posts.push(post as Post)
    })
  } catch (error: any) {
    throw Error(
      "error in getting the posts from the database with error: ",
      error
    )
  }

  return posts
}
