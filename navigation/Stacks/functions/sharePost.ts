import store from "../../../state/store"
import dummyUser from "../../../data/user"
import { uuidv } from "../../../utils/uuidv"

import { uploadImage } from "../../../firebase/storage"
import { savePost } from "../../../firebase/database/post/savePost"

export const sharePost = async () => {
  const { postData } = store.getState()
  const { user } = store.getState()

  const { caption, imageUri } = postData

  const remoteImageLocation = uuidv()

  let mediaUrl
  try {
    //upload the image to firebase storage
    mediaUrl = await uploadImage(imageUri, remoteImageLocation)
  } catch (error: any) {
    throw new Error(error.message)
  }

  const post = {
    mediaURL: mediaUrl,
    description: caption as string,
    mediaType: "image/jpeg",
    username: user.username,
    createdAt: new Date(),
    postOwner: user.uid,
  }

  try {
    await savePost(post)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
