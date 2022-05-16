import { db } from "../../firebaseConfig"
import {
  getDocs,
  updateDoc,
  doc,
  collection,
  where,
  query,
} from "firebase/firestore"

import { Post } from "../../../types/Post"
import { getImageUrl } from "../../../firebase/storage/index"

type GetUserPostsResult = Array<Post>

//this function creates the post in the
export const getUserPosts = async (
  uid: string
): Promise<GetUserPostsResult> => {
  let posts: Array<Post> = []
  const collectionRef = collection(db, "media")
  const q = query(collectionRef, where("postOwner", "==", uid))

  try {
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      //same as the post
      const post = doc.data()
      post.createdAt = new Date(post.createdAt).toString()

      posts.push(post as Post)
    })
  } catch (error: any) {
    throw Error(
      "error in getting the posts from the database with error: ",
      error
    )
  }

  try {
    for (let i = 0; i < posts.length; i++) {
      const mediaUrl = await getImageUrl(posts[i].mediaReference)
      posts[i].mediaReference = mediaUrl
    }
  } catch (error) {
    throw Error("error in getting the url from the mediaReference")
  }

  console.log(posts)
  return posts
}
