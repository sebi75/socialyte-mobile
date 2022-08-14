import { db } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"

import { uploadImage } from "../../storage"
import { uuidv } from "../../../utils/uuidv"

import { Story } from "../../types/Story"

export const postStory = async (story: Story) => {
  const collectionRef = collection(db, "stories")
  const imageUrl = await uploadImage(story.mediaURL, uuidv())

  try {
    await addDoc(collectionRef, {
      ...story,
      mediaURL: imageUrl,
    })
  } catch (error: any) {
    console.log({ error })
    //throw new Error("Error in saving the story")
  }
}
