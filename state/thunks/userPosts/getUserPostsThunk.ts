import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserPosts } from "../../../firebase/database/post/getUserPosts"

import { Post } from "../../types/Post"

export const getUserPostsThunk = createAsyncThunk(
  "userPosts/getUserPosts",
  async (
    uid: string,
    thunkAPI
  ): Promise<{ posts: Array<Post>; uid: string }> => {
    try {
      const response: Array<Post> = await getUserPosts(uid)
      return {
        posts: response,
        uid: uid,
      }
    } catch (error: any) {
      console.log(error.code)
      console.log("Error in getting user posts: ")
      console.log(error.message)
      throw new Error("Error in getting user posts")
    }
  }
)
