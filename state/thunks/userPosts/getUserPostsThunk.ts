import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserPosts } from "../../../firebase/database/post/getUserPosts"

import { setUserPosts } from "../../reducers/userProfilePosts"
import { Post } from "../../types/Post"

export const getUserPostsThunk = createAsyncThunk(
  "userPosts/getUserPosts",
  async (_, thunkAPI): Promise<any> => {
    const { dispatch } = thunkAPI
    const currentState: any = thunkAPI.getState()
    const uid = currentState.user.uid

    try {
      const response: Array<Post> = await getUserPosts(uid)
      console.log(response)
      dispatch(setUserPosts(response))
    } catch (error: any) {
      console.log(error.code)
      console.log("Error in getting user posts: ")
      console.log(error.message)
      throw new Error("Error in getting user posts")
    }
  }
)
