import { createAsyncThunk } from "@reduxjs/toolkit"

import { addComment } from "../../../firebase/database/post/addComment"

export const addCommentThunk = createAsyncThunk(
  "posts/addCommentThunk",
  async (
    { comment, uid, postId }: { comment: string; uid: string; postId: string },
    thunkAPI
  ): Promise<void> => {
    try {
      await addComment(comment, uid, postId)
    } catch (error: any) {
      console.log(error.code)
      console.log(error)
      throw new Error("Error adding comment")
    }
  }
)
