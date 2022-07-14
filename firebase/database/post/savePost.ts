import { db } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"

import { Post } from "../../../state/types/Post"
import { isPost, isPartialPost } from "../../../state/types/Post"

export const savePost = async (post: Post) => {
  const collectionRef = collection(db, "media")
  const { mediaURL, description, mediaType, username, createdAt, postOwner } =
    post

  if (!isPartialPost(post)) {
    throw new Error("Invalid post")
  }

  const postData: Partial<Post> = {
    postOwner: postOwner,
    mediaURL: mediaURL,
    description: description,
    mediaType: mediaType,
    username: username,
    createdAt: createdAt,
  }

  try {
    const postPost = await addDoc(collectionRef, postData)
  } catch (error: any) {
    console.log("Error in saving the post")
    console.log("error: ", error.message)
  }
}
