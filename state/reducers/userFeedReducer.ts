import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../types/Post"

/* THUNKS */
import { getUserPostsThunk } from "../thunks/userPosts/getUserPostsThunk"

interface UserFeedStateType {
  posts: Post[]
  isLoading: boolean
  error: string | undefined
}

const initialState: UserFeedStateType = {
  posts: [],
  isLoading: false,
  error: undefined,
}

const userFeed = createSlice({
  name: "userFeedSlice",
  initialState: initialState,
  reducers: {
    setUserFeedPosts: (state, action: PayloadAction<UserPostsAction>) => {
      const posts = action.payload.posts
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPostsThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(
      getUserPostsThunk.fulfilled,
      (state, action: PayloadAction<UserPostsAction>) => {
        state.isLoading = false
        const posts = action.payload.posts
        if (posts.length == 0) {
          state.posts = []
        }
        state.posts = posts
      }
    )
    builder.addCase(getUserPostsThunk.rejected, (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

interface UserPostsAction {
  posts: Array<Post>
}

export const { setUserFeedPosts } = userFeed.actions
export default userFeed.reducer
