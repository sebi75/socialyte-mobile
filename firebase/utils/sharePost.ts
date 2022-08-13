import store from "../../state/store"
import { uuidv } from "../../utils/uuidv"

import { uploadImage } from "../storage"
import { savePost } from "../database/post/savePost"

export const sharePost = async () => {
  const { postData } = store.getState()
  const { user } = store.getState()

  const { caption, imageUri } = postData

  const remoteImageLocation = uuidv()

  let mediaUrl
  try {
    mediaUrl = await uploadImage(imageUri, remoteImageLocation)
  } catch (error: any) {
    throw new Error(error.message)
  }

  const post = {
    mediaURL: mediaUrl,
    postDescription: caption as string,
    mediaType: "image/jpeg",
    username: user.username,
    createdAt: new Date(),
    postOwner: user.uid,
    profilePicture: user.profilePicture,
  }

  try {
    await savePost(post)
  } catch (error: any) {
    console.log(error)
    throw new Error(error.message)
  }
}
