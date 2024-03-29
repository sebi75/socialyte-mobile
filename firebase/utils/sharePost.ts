import store from "../../state/store"
import { uuidv } from "../../utils/uuidv"

import { uploadImage } from "../storage"
import { savePost } from "../database/post/savePost"

import { setUserPost } from "../../state/reducers/userProfilePosts"

export const sharePost = async () => {
  const { postData } = store.getState()
  const { user } = store.getState()

  const { caption, imageUri } = postData

  const remoteImageLocation = uuidv()

  let mediaUrl
  try {
    mediaUrl = await uploadImage(imageUri, remoteImageLocation)
  } catch (error: any) {
    console.log({ error })
    throw new Error(error.message)
  }

  const post = {
    mediaURL: mediaUrl,
    postDescription: caption ?? "",
    mediaType: "image/jpeg",
    username: user.username as string,
    createdAt: Date.now(),
    postOwner: user.uid as string,
    profilePicture: user.profilePicture as string,
    likes: [],
    numOfLikes: 0,
    numOfComments: 0,
    comments: [],
  }

  /* store.dispatch(
    setUserPost({
      post: {
        ...post,
        postId: uuidv(),
      },
      uid: user.uid as string,
    })
  ) */

  try {
    await savePost(post)
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}
