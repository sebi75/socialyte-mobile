import { db } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"

import { Post } from "../../types"

export const savePost = async (post: Partial<Post>) => {
  const collectionRef = collection(db, "media")
  const {
    mediaURL,
    postDescription,
    mediaType,
    username,
    createdAt,
    postOwner,
    profilePicture,
  } = post

  const postData: Partial<Post> = {
    postOwner: postOwner,
    mediaURL: mediaURL,
    postDescription: postDescription,
    mediaType: mediaType,
    username: username,
    createdAt: createdAt,
    numOfLikes: 0,
    numOfComments: 0,
    likes: [],
    comments: [],
    profilePicture: profilePicture,
  }

  try {
    await addDoc(collectionRef, postData)
  } catch (error: any) {
    console.log("Error in saving the post")
    throw new Error("Error in saving the post")
  }
}
