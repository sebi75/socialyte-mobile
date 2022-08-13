import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserFeed } from "../../../firebase/database/feed"

import { Post } from "../../../firebase/types"

export const getUserFeedThunk = createAsyncThunk(
  "userFeed/getUserFeed",
  async (uid: string, thunkAPI): Promise<Array<Post> | []> => {
    try {
      const response: any = await getUserFeed(uid)
      return response
    } catch (error: any) {
      console.log(error.code)
      throw new Error("Error in getting user feed")
    }
  }
)
