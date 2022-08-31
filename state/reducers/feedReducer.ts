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

    setLikePost: (
      state,
      action: PayloadAction<{
        postId: string
        uid: string
        type: "like" | "unlike"
      }>
    ) => {
      const { postId, uid, type } = action.payload
      const post = state.posts.find((p) => p.postId == postId)
      if (post) {
        if (type === "like") {
          post.likes.push(uid)
          post.numOfLikes++
        } else {
          post.likes = post.likes.filter((string) => string !== uid)
          post.numOfLikes--
        }
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clearFeedSliceState: (state) => {
      state = initialState
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
        state.isLoading = false
        state.posts = action.payload
      }
    )
    builder.addCase(getUserFeedThunk.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const {
  setUserFeedPosts,
  setIsLoading,
  setLikePost,
  clearFeedSliceState,
} = userFeedSlice.actions
export default userFeedSlice.reducer
