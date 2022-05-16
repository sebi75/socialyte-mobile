import { db } from "../../firebaseConfig"
import { getDocs, collection, where, query } from "firebase/firestore"

import { Post } from "../../../types/Post"

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
      post.createdAt = new Date(post.createdAt).getSeconds().toString()

      posts.push(post as Post)
    })
  } catch (error: any) {
    throw Error(
      "error in getting the posts from the database with error: ",
      error
    )
  }

  console.log(posts)
  return posts
}