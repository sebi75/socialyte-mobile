import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../../types/Post"

interface UserPostsState {
  posts: Array<Post>
}

const initialState: UserPostsState = {
  posts: [],
}

const userProfilePosts = createSlice({
  name: "userProfilePosts",
  initialState: initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<Array<Post>>) => {
      console.log("setting user posts")
      console.log("the payload is: ")
      console.log(action.payload)
      state.posts = action.payload
    },
  },
  extraReducers: {},
})

export const { setUserPosts } = userProfilePosts.actions
export default userProfilePosts.reducer
