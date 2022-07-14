import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserPosts } from "../../../firebase/database/post/getUserPosts"

import { setUserPosts } from "../../reducers/userProfilePosts"
import { Post } from "../../../firebase/database/post/types/Post"

export const getUserPostsThunk = createAsyncThunk(
  "userPosts/getUserPosts",
  async ({ uid }: { uid: string }, thunkAPI): Promise<any> => {
    const { dispatch } = thunkAPI

    try {
      const response: Array<Post> = await getUserPosts(uid)
      dispatch(setUserPosts(response))
    } catch (error: any) {
      console.log(error.code)
      console.log("Error in getting user posts: ")
      console.log(error.message)
      throw new Error("Error in getting user posts")
    }
  }
)
