import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserPosts } from "../../../firebase/database/post/getUserPosts"

import { setUserPosts } from "../../reducers/userProfilePosts"
import { Post } from "../../../types/Post"

export const getUserPostsThunk = createAsyncThunk(
  "userPosts/getUserPosts",
  async ({ uid }: { uid: string }, thunkAPI): Promise<any> => {
    const { dispatch } = thunkAPI

    try {
      const response: Array<Post> = await getUserPosts(uid)
      console.log("getting here in the thunk")
      dispatch(setUserPosts(response))

      return response
    } catch (error: any) {
      const errorMessage = error.message
      const errorCode = error.code
      console.log(
        "Error in getting user posts with following errorMessage and code: "
      )
      console.log(errorMessage)
      console.log(errorCode)
    }
  }
)
