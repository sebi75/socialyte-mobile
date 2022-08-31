import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../../firebase/types"

/* THUNKS */
import { getUserPostsThunk } from "../thunks/posts/getUserPostsThunk"

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

    setUserPost: (
      state,
      action: PayloadAction<{ post: Post; uid: string }>
    ) => {
      const uid = action.payload.uid
      state.users[uid].push(action.payload.post)
    },
    clearUserProfilePostsSliceState: (state) => {
      state = initialState
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

export const { setUserPosts, setUserPost, clearUserProfilePostsSliceState } =
  userProfilePosts.actions
export default userProfilePosts.reducer
