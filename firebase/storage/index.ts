import { storage } from "../firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

//BIG TODO:
//support more than just images

//upload image function will upload the image to firebase storage and return
//the remote url to store it as the mediaUrl in the "media" collection posts
export const uploadImage = async (
  uploadUri: any,
  fileName: string
): Promise<string> => {
  const imagesRef = ref(storage, `images/${fileName}`)
  let imageUrl = ""

  const response = await fetch(uploadUri)
  const blob = await response.blob()

  try {
    await uploadBytes(imagesRef, blob)
  } catch (error) {
    console.log("error in uploading the image to the cloud storage: ", error)
  }

  try {
    imageUrl = await getImageUrl(fileName)
  } catch (error: any) {
    console.log("Error in getting the imageURL with error,", error)
  }

  return imageUrl
}

/* Logic to get the media Google storage url for using in the app */
export const getImageUrl = async (mediaReference: string): Promise<string> => {
  const imageRef = ref(storage, `images/${mediaReference}`)

  let imageUrl = ""
  try {
    const downloadURL = await getDownloadURL(imageRef)

    imageUrl = downloadURL
  } catch (error: any) {
    console.log("error encountered: ", error.message)
  }
  return imageUrl
}
