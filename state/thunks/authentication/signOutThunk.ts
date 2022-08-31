import { createAsyncThunk } from "@reduxjs/toolkit"

import { signOut } from "../../../firebase/authentication/signOut."

/* clear states action creators */
import { clearAuthenticationSliceState } from "../../reducers/authenticationReducer"
import { clearCreatePostSliceState } from "../../reducers/createPostReducer"
import { clearEditProfileSliceState } from "../../reducers/editProfileReducer"
import { clearFeedSliceState } from "../../reducers/feedReducer"
import { clearpostUtilsSliceState } from "../../reducers/postsUtilsReducer"
import { clearSearchUsersSliceState } from "../../reducers/searchUsersReducer"
import { clearStoriesSliceState } from "../../reducers/storiesReducer"
import { clearUserConnectionsSliceState } from "../../reducers/userConnectionsReducer"
import { clearUserFeedSliceState } from "../../reducers/userFeedReducer"
import { clearUserProfilePostsSliceState } from "../../reducers/userProfilePosts"
import { clearUserState } from "../../reducers/userSlice"

export const signOutThunk = createAsyncThunk(
  "user/signOut",
  async (_, { dispatch }) => {
    try {
      await signOut()
      dispatch(clearAuthenticationSliceState())
      dispatch(clearCreatePostSliceState())
      dispatch(clearEditProfileSliceState())
      dispatch(clearFeedSliceState())
      dispatch(clearpostUtilsSliceState())
      dispatch(clearSearchUsersSliceState())
      dispatch(clearStoriesSliceState())
      dispatch(clearUserConnectionsSliceState())
      dispatch(clearUserFeedSliceState())
      dispatch(clearUserProfilePostsSliceState())
      dispatch(clearUserState())
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
)
