import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Story } from "../../firebase/types"

/* THUNKS */
import { postStoryThunk } from "../thunks/stories/postStoryThunk"
import { getStoriesThunk } from "../thunks/stories/getStoriesThunk"

interface UserStoriesStateType {
  stories: Story[]
  isLoading: boolean
  postError: string | undefined
  getError: string | undefined
}

const initialState: UserStoriesStateType = {
  stories: [],
  isLoading: false,
  postError: undefined,
  getError: undefined,
}

const userStories = createSlice({
  name: "userStories",
  initialState: initialState,
  reducers: {
    setUserStories: (state, action: PayloadAction<UserStoriesAction>) => {
      state.stories = action.payload.stories
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postStoryThunk.rejected, (state, action: any) => {
      state.postError = action.payload
    })
    builder.addCase(getStoriesThunk.pending, (state, action: any) => {
      state.isLoading = true
    })
    builder.addCase(
      getStoriesThunk.fulfilled,
      (state, action: PayloadAction<Story[]>) => {
        state.stories = action.payload
      }
    )
  },
})

interface UserStoriesAction {
  stories: Array<Story>
}

export const { setUserStories } = userStories.actions
export default userStories.reducer
