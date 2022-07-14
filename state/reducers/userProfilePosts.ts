import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../../firebase/database/post/types/Post"

/* THUNKS */
import { getUserPostsThunk } from "../thunks/userPosts/getUserPostsThunk"

interface UserPostsState {
  posts: Array<Post>
  isLoading: boolean
  error: string | undefined
}

const initialState: UserPostsState = {
  posts: [],
  isLoading: false,
  error: undefined,
}

const userProfilePosts = createSlice({
  name: "userProfilePosts",
  initialState: initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<Array<Post>>) => {
      state.posts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPostsThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getUserPostsThunk.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(getUserPostsThunk.rejected, (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { setUserPosts } = userProfilePosts.actions
export default userProfilePosts.reducer
