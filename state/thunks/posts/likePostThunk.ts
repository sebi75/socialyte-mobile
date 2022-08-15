import { createAsyncThunk } from "@reduxjs/toolkit"

import { likePostOperation } from "../../../firebase/database/post/likePost"

export const likePostOperationThunk = createAsyncThunk(
  "posts/likePostThunk",
  async (
    {
      postId,
      userId,
      type,
    }: { postId: string; userId: string; type: "like" | "unlike" },
    thunkAPI
  ): Promise<void> => {
    try {
      await likePostOperation(postId, userId, type)
    } catch (error: any) {
      console.log(error.code)
      console.log(error)
      throw new Error("Error liking post")
    }
  }
)
