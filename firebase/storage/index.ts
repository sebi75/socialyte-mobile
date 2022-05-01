import { storage } from "../firebaseConfig"
import { ref, uploadBytes } from "firebase/storage"

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
