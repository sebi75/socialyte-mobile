import { db } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"

import { Post } from "../../../state/types/Post"
import { isPost, isPartialPost } from "../../../state/types/Post"

export const savePost = async (post: Partial<Post>) => {
  const collectionRef = collection(db, "media")
  const { mediaURL, description, mediaType, username, createdAt, postOwner } =
    post

  //these lines of code broke the code when sharing the post
  //check for the sending post to be a valid post
  /* if (!isPost(post)) {
    throw new Error("Error creating post")
  } */

  const postData: Partial<Post> = {
    postOwner: postOwner,
    mediaURL: mediaURL,
    description: description,
    mediaType: mediaType,
    username: username,
    createdAt: createdAt,
  }

  try {
    await addDoc(collectionRef, postData)
  } catch (error: any) {
    console.log("Error in saving the post")
    throw new Error("Error in saving the post")
  }
}
