import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../types/Post"

/* THUNKS */
import { getUserPostsThunk } from "../thunks/userPosts/getUserPostsThunk"

interface UserPostsState {
  users: { [key: string]: Array<Post> }
  isLoading: boolean
  error: string | undefined
}

const initialState: UserPostsState = {
  users: {},
  isLoading: false,
  error: undefined,
}

const userProfilePosts = createSlice({
  name: "userProfilePosts",
  initialState: initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<UserPostsAction>) => {
      const uid = action.payload.uid
      const posts = action.payload.posts
      state.users[uid] = posts
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
        const uid = action.payload.uid
        const posts = action.payload.posts
        if (posts.length == 0) {
          state.users[uid] = []
        }
        state.users[uid] = posts
      }
    )
    builder.addCase(getUserPostsThunk.rejected, (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

interface UserPostsAction {
  uid: string
  posts: Array<Post>
}

export const { setUserPosts } = userProfilePosts.actions
export default userProfilePosts.reducer
