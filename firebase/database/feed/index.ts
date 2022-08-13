import { db } from "../../firebaseConfig"
import {
  getDocs,
  collection,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore"

import { Post } from "../../types"
import { formatDate } from "../../../utils/formatDate"

type GetUserPostsResult = Array<Post>

export const getUserFeed = async (uid: string): Promise<GetUserPostsResult> => {
  const time1 = performance.now()
  let posts: Array<Post> = []
  const collectionRef = collection(db, "media")
  const userIdsDocument = await getDoc(doc(db, "connections", uid))
  const userIdsData = userIdsDocument.data()
  console.log({ userIdsData: userIdsData })
  const userIds = userIdsData?.following || []

  const q = query(collectionRef, where("postOwner", "in", userIds))

  try {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(async (document) => {
      const post = document.data()

      const userDocRef = doc(db, "users", post.postOwner)
      const userDoc = await getDoc(userDocRef)
      const userData = userDoc.data()

      post.createdAt = formatDate(new Date(post.createdAt.toDate()))
      post.postId = document.id
      post.profilePicture = userData?.profilePicture
      post.username = userData?.username

      posts.push(post as Post)
    })
  } catch (error: any) {
    throw Error(
      "error in getting the posts from the database with error: ",
      error
    )
  }
  const time2 = performance.now()
  console.log(`getUserFeed took ${time2 - time1} milliseconds`)
  return posts
}
