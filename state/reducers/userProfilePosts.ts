import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  posts: [],
}

const userProfilePosts = createSlice({
  name: "userProfilePosts",
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
  },
  extraReducers: {},
})

export const { setPosts } = userProfilePosts.actions
export default userProfilePosts.reducer
