import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../../firebase/types"

/* THUNKS */
import { getUserFeedThunk } from "../thunks/feed/getUserFeedThunk"

export interface UserFeedState {
  posts: Array<Post>
  isLoading: boolean
  fetchedAtFirstMount: boolean
}

const initialState: UserFeedState = {
  posts: [],
  isLoading: false,
  fetchedAtFirstMount: false,
}

export const userFeedSlice = createSlice({
  name: "userFeed",
  initialState,
  reducers: {
    setUserFeedPosts: (state, action: PayloadAction<Array<Post>>) => {
      state.posts = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserFeedThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getUserFeedThunk.fulfilled,
      (state, action: PayloadAction<Array<Post>>) => {
        state.fetchedAtFirstMount = true
        state.posts = action.payload
      }
    )
  },
})

export const { setUserFeedPosts, setIsLoading } = userFeedSlice.actions
export default userFeedSlice.reducer
