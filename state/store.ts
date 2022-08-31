import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

/* reducers */
import createPostReducer from "./reducers/createPostReducer"
import authenticationReducer from "./reducers/authenticationReducer"
import userReducer from "./reducers/userSlice"
import userProfilePostsReducer from "./reducers/userProfilePosts"
import editProfileReducer from "./reducers/editProfileReducer"
import searchUsersReducer from "./reducers/searchUsersReducer"
import userConnectionsReducer from "./reducers/userConnectionsReducer"
import userFeedReducer from "./reducers/feedReducer"
import storiesReducer from "./reducers/storiesReducer"
import postsUtilsReducer from "./reducers/postsUtilsReducer"
import discoverPostsReducer from "./reducers/discoverPostsReducer"
import globalAlertReducer from "./reducers/globalAlertReducer"

const store = configureStore({
  reducer: {
    userPosts: userProfilePostsReducer,
    userFeed: userFeedReducer,
    userConnections: userConnectionsReducer,
    postsUtils: postsUtilsReducer,
    stories: storiesReducer,
    globalAlert: globalAlertReducer,
    editProfile: editProfileReducer,
    searchUsers: searchUsersReducer,
    auth: authenticationReducer,
    postData: createPostReducer,
    user: userReducer,
    discover: discoverPostsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
