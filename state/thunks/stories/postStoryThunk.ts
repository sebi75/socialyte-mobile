import { createAsyncThunk } from "@reduxjs/toolkit"
import { postStory } from "../../../firebase/database/stories/postStory"

import { Story } from "../../../firebase/types"

export const postStoryThunk = createAsyncThunk(
  "userStories/postStory",
  async (story: Story, thunkAPI: any): Promise<any> => {
    try {
      const response = await postStory(story)
      console.log("got here")
    } catch (error: any) {
      console.log(error)
      throw new Error("Error in saving the story")
    }
  }
)
