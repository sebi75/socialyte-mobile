import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import createPostReducer from "./reducers/createPostReducer"
import authenticationReducer from "./reducers/authenticationReducer"
import userReducer from "./reducers/userSlice"
import userProfilePostsReducer from "./reducers/userProfilePosts"
import editProfileReducer from "./reducers/editProfileReducer"

const store = configureStore({
  reducer: {
    editProfile: editProfileReducer,
    userPosts: userProfilePostsReducer,
    postData: createPostReducer,
    auth: authenticationReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
