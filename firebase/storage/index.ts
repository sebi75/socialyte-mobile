import { storage } from "../firebaseConfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

//create ref to the cloud storage

export const uploadImage = async (uploadUri: any) => {
  const fileName =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)

  const imagesRef = ref(storage, `images/${fileName}`)

  const response = await fetch(uploadUri)
  const blob = await response.blob()

  uploadBytes(imagesRef, blob).then((snapshot) => {
    console.log("Uploaded a blob or file!")
  })
}

/* Logic to get the media Google storage url for using in the app */
export const getImageUrl = async () => {
  //const startDate = performance.now()
  const imageName = "qh152o8efl2nayul7dbrk"
  const imageRef = ref(storage, `images/${imageName}`)

  let imageUrl
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
