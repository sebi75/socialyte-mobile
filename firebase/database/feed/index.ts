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

  const userIds = userIdsData?.following || []

  const q = query(collectionRef, where("postOwner", "in", userIds))

  try {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((document) => {
      const post = document.data()

      posts.push({
        ...post,
        postId: document.id,
      } as unknown as Post)
    })
  } catch (error: any) {
    throw Error("error in the getFeed function", error)
  }
  const time2 = performance.now()
  console.log(`getUserFeed took ${time2 - time1} milliseconds`)
  return posts
}
