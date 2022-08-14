import { createAsyncThunk } from "@reduxjs/toolkit"
import { getStories } from "../../../firebase/database/stories/getStories"

import { Story } from "../../../firebase/types"

export const getStoriesThunk = createAsyncThunk(
  "userStories/getStories",
  async (_, thunkAPI: any): Promise<Story[] | []> => {
    try {
      console.log({ message: "got here" })
      const stories = await getStories()

      if (stories.length == 0) {
        return []
      }
      return stories
    } catch (error: any) {
      console.log(error)
      throw new Error("Error in getting the stories from the database")
    }
  }
)
