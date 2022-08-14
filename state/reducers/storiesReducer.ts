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
  fetchedOnce: boolean
}

const initialState: UserStoriesStateType = {
  stories: [],
  isLoading: false,
  postError: undefined,
  getError: undefined,
  fetchedOnce: false,
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
        state.isLoading = false
        state.fetchedOnce = true
        state.stories = action.payload
      }
    )
    builder.addCase(getStoriesThunk.rejected, (state, action) => {
      state.isLoading = false
      console.log(action.error)
      state.getError = "Error: Could not get stories"
    })
  },
})

interface UserStoriesAction {
  stories: Array<Story>
}

export const { setUserStories } = userStories.actions
export default userStories.reducer
