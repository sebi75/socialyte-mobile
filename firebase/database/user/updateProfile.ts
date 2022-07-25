import { db } from "../../firebaseConfig"
import { updateDoc, doc, getDoc } from "firebase/firestore"
import { uploadImage } from "../../storage"
import { uuidv } from "../../../utils/uuidv"

export interface UpdatedFields {
  username?: string
  description?: string
  profilePicture?: string
}

export const updateProfile = async (
  uid: string,
  updateFields: UpdatedFields
): Promise<any> => {
  const { username, description, profilePicture } = updateFields
  let imageUrl = undefined
  if (profilePicture && profilePicture.length > 0) {
    const imageRemoteLocation = uuidv()
    try {
      imageUrl = await uploadImage(profilePicture, imageRemoteLocation)
    } catch (error) {
      throw new Error("Error")
    }
  }
  let updateObj = {}
  if (imageUrl) {
    updateObj = {
      username,
      description,
      profilePicture: imageUrl,
    }
  } else {
    updateObj = {
      username,
      description,
    }
  }
  const docRef = doc(db, "users", uid)
  try {
    await updateDoc(docRef, updateObj)
    const response = await getDoc(docRef)
    return response.data()
  } catch (error: any) {
    throw new Error("Error")
  }
}
