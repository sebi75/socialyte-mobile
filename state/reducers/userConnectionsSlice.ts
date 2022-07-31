import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserFollowArrayType } from "../../firebase/types"

import {
  getUserConnectionsIdsThunk,
  UserConnectionsReturnResult,
} from "../thunks/user-connections/getUserConnectionIdsThunk"
import {
  getUserConnectionsThunk,
  UserConnectionsReturnResult as UserConnectionsType,
} from "../thunks/user-connections/getUserConnectionsThunk"

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

/* 
DETAIL: retrieving the user's followers and following ids should happen
        when the user loggs in and then we can't neccessarily save it in the
        client cache, because the list needs to always be up to date.

        so the solution is having it in the state and only getting them again
        if the state is cleared, to pupulate it again

        another solution would be connecting users through websockets and then
        getting updates when a user follows, unfollows etc and update in real time
        but I think firebase only lets us do this through cloud functions
*/

interface UserConnectionsState {
  followersIds: string[]
  followingIds: string[]
  followersPreview: UserFollowArrayType
  followingPreview: UserFollowArrayType
  temporaryFollowersPreview: UserFollowArrayType
  temporaryFollowingPreview: UserFollowArrayType
  isLoading: boolean
  fetchedAtStartup: boolean
}

const userConnectionsInitialState: UserConnectionsState = {
  followersIds: [],
  followingIds: [],
  followersPreview: [],
  followingPreview: [],
  temporaryFollowersPreview: [],
  temporaryFollowingPreview: [],
  isLoading: false,
  fetchedAtStartup: false,
}

export const userConnectionsSlice = createSlice({
  name: "userConnections",
  initialState: userConnectionsInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setFollowUser: (state, action: PayloadAction<string>) => {
      state.followingIds.push(action.payload)
    },
    setUnfollowUser: (state, action: PayloadAction<string>) => {
      state.followingIds = state.followingIds.filter(
        (id) => id != action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserConnectionsIdsThunk.fulfilled,
      (state, action: PayloadAction<UserConnectionsReturnResult>) => {
        state.fetchedAtStartup = true
        if (action.payload.type === "followers") {
          state.followersIds = action.payload.ids
        } else {
          console.log("only console logginf: ")
          console.log(action.payload.ids)
          console.log(action.payload.ids.length)
        }
      }
    )
    builder.addCase(getUserConnectionsThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(
      getUserConnectionsThunk.fulfilled,
      (state, action: PayloadAction<UserConnectionsType>) => {
        state.isLoading = false
        if (action.payload.type === "followers") {
          if (action.payload.temporary) {
            state.temporaryFollowersPreview = action.payload.response
          } else {
            state.followersPreview = action.payload.response
          }
        } else {
          if (action.payload.temporary) {
            state.temporaryFollowingPreview = action.payload.response
          } else {
            state.followingPreview = action.payload.response
          }
        }
      }
    )
  },
})

export const { setUnfollowUser, setFollowUser, setIsLoading } =
  userConnectionsSlice.actions
export default userConnectionsSlice.reducer
