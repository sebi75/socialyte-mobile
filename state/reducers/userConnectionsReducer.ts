import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  getUserConnectionsIdsThunk,
  GetUserConnectionsIdsThunkReturnResult,
} from "../thunks/user-connections/getUserConnectionIdsThunk"

import {
  UserFollowArrayType,
  getUserConnectionsThunk,
  UserConnectionsReturnResult as UserConnectionsType,
} from "../thunks/user-connections/getUserConnectionsThunk"

interface UserConnectionsState {
  followersIds: string[]
  followingIds: string[]
  numberOfFollowers: number
  numberOfFollowings: number
  temporaryFollowersIds: { [key: string]: Array<string> } //key: string is the userIds
  temporaryFollowingIds: { [key: string]: Array<string> }
  temporaryNumberOfFollowers: { [key: string]: number }
  temporaryNumberOfFollowings: { [key: string]: number }
  followersPreview: UserFollowArrayType
  followingPreview: UserFollowArrayType
  temporaryFollowersPreview: { [key: string]: UserFollowArrayType }
  temporaryFollowingPreview: { [key: string]: UserFollowArrayType }
  arbitrarySearch: UserFollowArrayType | []
  inputSearchText: string
  isLoading: boolean
  fetchedAtStartup: boolean
}

const userConnectionsInitialState: UserConnectionsState = {
  followersIds: [],
  followingIds: [],
  numberOfFollowers: 0,
  numberOfFollowings: 0,
  temporaryFollowersIds: {},
  temporaryFollowingIds: {},
  temporaryNumberOfFollowers: {},
  temporaryNumberOfFollowings: {},
  followersPreview: [],
  followingPreview: [],
  temporaryFollowersPreview: {},
  temporaryFollowingPreview: {},
  arbitrarySearch: [],
  inputSearchText: "",
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
      const userId = action.payload
      state.followingIds.push(userId)
      state.numberOfFollowings++

      if (state.temporaryFollowersIds[userId]) {
        state.temporaryFollowersIds[userId].push(userId)
      }

      state.temporaryNumberOfFollowers[userId]++
    },
    setUnfollowUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      state.followingIds = state.followingIds.filter((id) => id != userId)
      state.followingPreview = state.followingPreview.filter((user) => {
        return user.uid != userId
      })
      if (state.temporaryFollowersIds[userId]) {
        state.temporaryFollowersIds[userId] = state.temporaryFollowersIds[
          userId
        ].filter((id) => id != action.payload)
      }
      state.numberOfFollowings--
      state.temporaryNumberOfFollowers[action.payload]--
    },
    setArbitrarySearchResult: (
      state,
      action: PayloadAction<UserFollowArrayType>
    ) => {
      state.arbitrarySearch = action.payload
    },
    setInputSearchText: (state, action: PayloadAction<string>) => {
      state.inputSearchText = action.payload
    },
    clearTemporaryStoredData: (state) => {
      state.temporaryFollowersIds = {}
      state.temporaryFollowingIds = {}
      state.temporaryNumberOfFollowers = {}
      state.temporaryNumberOfFollowings = {}
      state.temporaryFollowersPreview = {}
      state.temporaryFollowingPreview = {}
    },
    clearUserConnectionsSliceState: (state) => {
      state = userConnectionsInitialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserConnectionsIdsThunk.fulfilled,
      (
        state,
        action: PayloadAction<GetUserConnectionsIdsThunkReturnResult>
      ) => {
        const userId = action.payload.response.uid
        state.fetchedAtStartup = true
        if (action.payload.temporary) {
          state.temporaryFollowersIds[userId] =
            action.payload.response.followers
          state.temporaryFollowingIds[userId] =
            action.payload.response.following
          state.temporaryNumberOfFollowers[userId] =
            action.payload.response.numberOfFollowers
          state.temporaryNumberOfFollowings[userId] =
            action.payload.response.numberOfFollowings
        } else {
          state.followersIds = action.payload.response.followers
          state.followingIds = action.payload.response.following
          state.numberOfFollowers = action.payload.response.numberOfFollowers
          state.numberOfFollowings = action.payload.response.numberOfFollowings
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
        const userId = action.payload.uid
        if (action.payload.type === "followers") {
          if (action.payload.temporary) {
            state.temporaryFollowersPreview[userId] = action.payload.response
          } else {
            state.followersPreview = action.payload.response
          }
        } else {
          if (action.payload.temporary) {
            state.temporaryFollowingPreview[userId] = action.payload.response
          } else {
            state.followingPreview = action.payload.response
          }
        }
      }
    )
  },
})

export const {
  setUnfollowUser,
  setFollowUser,
  setIsLoading,
  setArbitrarySearchResult,
  clearTemporaryStoredData,
  clearUserConnectionsSliceState,
  setInputSearchText,
} = userConnectionsSlice.actions
export default userConnectionsSlice.reducer
