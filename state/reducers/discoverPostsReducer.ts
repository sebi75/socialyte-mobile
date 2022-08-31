import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../../firebase/types"

/* THUNKS */
import { getDiscoverPostsThunk } from "../thunks/discover/getDiscoverPostsThunk"

export interface UserDiscoverPostsState {
  posts: Array<Post>
  isLoading: boolean
}

const initialState: UserDiscoverPostsState = {
  posts: [],
  isLoading: false,
}

export const userDiscoverSlice = createSlice({
  name: "userDiscover",
  initialState,
  reducers: {
    setUserDiscoverPosts: (state, action: PayloadAction<Array<Post>>) => {
      state.posts = action.payload
    },

    /* setLikePost: (
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
        } else {
          post.likes = post.likes.filter((string) => string !== uid)
        }
      }
    }, */
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clearDiscoverSliceState: (state) => {
      state = initialState
    },
  },
  extraReducers(builder) {
    builder.addCase(getDiscoverPostsThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getDiscoverPostsThunk.fulfilled,
      (state, action: PayloadAction<Array<Post>>) => {
        state.isLoading = false
        state.posts = action.payload
      }
    )
    builder.addCase(getDiscoverPostsThunk.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const {
  setUserDiscoverPosts,
  setIsLoading,
  /* setLikePost */ clearDiscoverSliceState,
} = userDiscoverSlice.actions
export default userDiscoverSlice.reducer
