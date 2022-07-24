import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserPosts } from "../../../firebase/database/post/getUserPosts"

import { Post } from "../../types/Post"

export const getUserPostsThunk = createAsyncThunk(
  "userPosts/getUserPosts",
  async (uid: string, thunkAPI): Promise<Array<Post>> => {
    try {
      const response: Array<Post> = await getUserPosts(uid)
      return response
    } catch (error: any) {
      console.log(error.code)
      console.log("Error in getting user posts: ")
      console.log(error.message)
      throw new Error("Error in getting user posts")
    }
  }
)
