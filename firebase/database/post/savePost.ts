import { db } from "../../firebaseConfig"
import { doc, setDoc, addDoc, collection } from "firebase/firestore"

import dummyPost from "../../../data/user"

export const savePost = async (post?: any) => {
  const collectionRef = collection(db, "media")

  const postData = {
    postOwner: dummyPost.userId,
    mediaReference: "qh152o8efl2nayul7dbrk",
    mediaType: "image/jpeg",
    username: dummyPost.username,
    createdAt: new Date(),
  }

  try {
    const postPost = await addDoc(collectionRef, postData)
  } catch (error: any) {
    console.log("error: ", error.message)
  }
}
