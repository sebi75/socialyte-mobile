import { db } from "../../firebaseConfig"
import { doc, setDoc, addDoc, collection } from "firebase/firestore"

interface PostInterface {
  mediaReference: string
  description: string
  mediaType: string
  username: string
  createdAt: Date
  postOwner: string
}

export const savePost = async (post: PostInterface) => {
  const collectionRef = collection(db, "media")
  const {
    mediaReference,
    description,
    mediaType,
    username,
    createdAt,
    postOwner,
  } = post

  const postData = {
    postOwner: postOwner,
    mediaReference: mediaReference,
    description: description,
    mediaType: mediaType,
    username: username,
    createdAt: createdAt,
  }

  try {
    const postPost = await addDoc(collectionRef, postData)
  } catch (error: any) {
    console.log("error: ", error.message)
  }
}
