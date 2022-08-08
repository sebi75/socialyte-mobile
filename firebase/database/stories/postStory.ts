import { db } from "../../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"

import { uploadImage } from "../../storage"
import { uuidv } from "../../../utils/uuidv"

import { Story } from "../../types/Story"

export const postStory = async (story: Story) => {
  const collectionRef = collection(db, "stories")

  const storyData: Story = {
    ...story,
  }

  try {
    await addDoc(collectionRef, storyData)
  } catch (error: any) {
    console.log("Error in saving the story")
    console.log({ error })
    throw new Error("Error in saving the post")
  }
}
