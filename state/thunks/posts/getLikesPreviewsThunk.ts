import { createAsyncThunk } from "@reduxjs/toolkit"

import { getLikesPreviews } from "../../../firebase/database/post/getLikesPreviews"

import { LikePreview } from "../../../firebase/types"

export const getLikesPreviewsThunk = createAsyncThunk(
  "posts/getLikesPreviewsThunk",
  async (
    postId: string,
    thunkAPI
  ): Promise<{ postId: string; likesPreviews: LikePreview[] }> => {
    try {
      const likesPreviews = await getLikesPreviews(postId)

      return { likesPreviews, postId }
    } catch (error: any) {
      console.log(error.code)
      console.log(error)
      throw new Error("Error getting the likes previews", error)
    }
  }
)
