import { createAsyncThunk } from "@reduxjs/toolkit"

import { getComments } from "../../../firebase/database/post/getComments"

import { Comment } from "../../../firebase/types"

export const getCommentsThunk = createAsyncThunk(
  "posts/getCommentsThunk",
  async (postId: string, thunkAPI): Promise<Comment[]> => {
    try {
      const comments = await getComments(postId)

      return comments
    } catch (error: any) {
      console.log(error.code)
      console.log(error)
      throw new Error("Error liking post")
    }
  }
)
