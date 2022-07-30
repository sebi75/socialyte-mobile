import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { updateUserProfileThunk } from "../thunks/user/updateUserProfileThunk"

import {
  UserFollowArrayType,
  UserFollowPreviewType,
} from "../../firebase/types"

/* Let's see how we need to design the connections state:
        1. We need to have both the arrays with the uids of followers and following so we can display well UI in the application.

        2. We need to get the preview of following / followers users depending which, when the user / someone clicks the buttons on the profile to display the lists

        3. We will have some limiting to not make so many requests and then we will add some pagination to be able to load more users as the user scrolls down the list. 

        4. So: The state will be:
            {
                followersIds: [],
                followingIds: [],
                followersPreview: [],
                followingPreview: []
            }
*/

interface UserConnectionsState {
  followersIds: string[]
  followingIds: string[]
  followersPreview: UserFollowArrayType
  followingPreview: UserFollowArrayType
}

const userConnectionsInitialState: UserConnectionsState = {
  followersIds: [],
  followingIds: [],
  followersPreview: [],
  followingPreview: [],
}

export const userConnectionsSlice = createSlice({
  name: "userConnections",
  initialState: userConnectionsInitialState,
  reducers: {},
  extraReducers: {},
})

export default userConnectionsSlice.reducer
