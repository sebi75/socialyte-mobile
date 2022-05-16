import { db } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"

import { Post } from "../../../types/Post"

export const savePost = async (post: Post) => {
  const collectionRef = collection(db, "media")
  const { mediaURL, description, mediaType, username, createdAt, postOwner } =
    post

  const postData: Post = {
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
