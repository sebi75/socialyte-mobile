import store from "../../../state/store"
import dummyUser from "../../../data/user"
import { uuidv } from "../../../utils/uuidv"

import { uploadImage } from "../../../firebase/storage"
import { savePost } from "../../../firebase/database/post/savePost"

export const sharePost = async () => {
  const { postData } = store.getState()
  const { caption, imageUri } = postData

  const remoteImageLocation = uuidv()

  try {
    await uploadImage(imageUri, remoteImageLocation)
  } catch (error) {
    console.log("Error in uploading the image on firebase firestore", error)
  }

  const post = {
    mediaReference: remoteImageLocation,
    description: caption as string,
    mediaType: "image/jpeg",
    username: dummyUser.username,
    createdAt: new Date(),
    postOwner: dummyUser.userId,
  }

  try {
    await savePost(post)
  } catch (error) {
    console.log("error in saving the post on firebase firestore", error)
  }
}
