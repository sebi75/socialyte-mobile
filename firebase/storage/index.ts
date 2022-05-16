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
    await uploadBytes(imagesRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!")
    })
  } catch (error) {
    console.log("error in uploading the image to the cloud storage: ", error)
  }

  try {
    imageUrl = await getImageUrl(fileName)
  } catch (error: any) {
    console.log("Error in getting the imageURL with error,", error)
  }

  console.log("ready to return the imageURL:", imageUrl)
  return imageUrl
}

/* Logic to get the media Google storage url for using in the app */
export const getImageUrl = async (mediaReference: string): Promise<string> => {
  const startDate = performance.now()
  const imageRef = ref(storage, `images/${mediaReference}`)

  let imageUrl = ""
  try {
    const downloadURL = await getDownloadURL(imageRef)

    imageUrl = downloadURL
  } catch (error: any) {
    console.log("error encountered: ", error.message)
  }
  const endDate = performance.now()
  console.log("miliseconds taken to get image url: ", endDate - startDate)
  return imageUrl
}
