import { createAsyncThunk } from "@reduxjs/toolkit"
import { postStory } from "../../../firebase/database/stories/postStory"

import { Story } from "../../../firebase/types"

export const postStoryThunk = createAsyncThunk(
  "userStories/postStory",
  async (story: Story, thunkAPI: any): Promise<any> => {
    try {
      await postStory(story)
      return
    } catch (error: any) {
      console.log(error)
      throw new Error("Error in saving the story")
    }
  }
)
