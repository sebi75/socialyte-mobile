import { storage } from "../firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

//create ref to the cloud storage

export const uploadImage = async (uploadUri: any, fileName: string) => {
  const imagesRef = ref(storage, `images/${fileName}`)

  const response = await fetch(uploadUri)
  const blob = await response.blob()

  uploadBytes(imagesRef, blob).then((snapshot) => {
    console.log("Uploaded a blob or file!")
  })
}

/* Logic to get the media Google storage url for using in the app */
export const getImageUrl = async (mediaReference: string): Promise<string> => {
  //const startDate = performance.now()
  const imageRef = ref(storage, `images/${mediaReference}`)

  let imageUrl = ""
  try {
    const downloadURL = await getDownloadURL(imageRef)

    imageUrl = downloadURL
  } catch (error: any) {
    console.log("error encountered: ", error.message)
  }
  //const endDate = performance.now()
  //console.log("miliseconds taken to get image url: ", endDate - startDate)
  return imageUrl
}
