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
  temporaryFollowersIds: string[]
  temporaryFollowingIds: string[]
  temporaryNumberOfFollowers: number
  temporaryNumberOfFollowings: number
  followersPreview: UserFollowArrayType
  followingPreview: UserFollowArrayType
  temporaryFollowersPreview: UserFollowArrayType
  temporaryFollowingPreview: UserFollowArrayType
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
  temporaryFollowersIds: [],
  temporaryFollowingIds: [],
  temporaryNumberOfFollowers: 0,
  temporaryNumberOfFollowings: 0,
  followersPreview: [],
  followingPreview: [],
  temporaryFollowersPreview: [],
  temporaryFollowingPreview: [],
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
      state.followingIds.push(action.payload)
      state.numberOfFollowings++
      state.temporaryFollowersIds.push(action.payload)
      state.temporaryNumberOfFollowers++
    },
    setUnfollowUser: (state, action: PayloadAction<string>) => {
      state.followingIds = state.followingIds.filter(
        (id) => id != action.payload
      )
      state.followingPreview = state.followingPreview.filter((user) => {
        return user.uid != action.payload
      })
      state.temporaryFollowersIds = state.temporaryFollowersIds.filter(
        (id) => id != action.payload
      )
      state.numberOfFollowings--
      state.temporaryNumberOfFollowers--
    },
    setArbitrarySearchResult: (
      state,
      action: PayloadAction<UserFollowArrayType>
    ) => {
      console.log("setting arbitrary search result", action.payload)
      state.arbitrarySearch = action.payload
    },
    setInputSearchText: (state, action: PayloadAction<string>) => {
      state.inputSearchText = action.payload
    },
    clearTemporaryStoredData: (state) => {
      state.temporaryFollowersIds = []
      state.temporaryFollowingIds = []
      state.temporaryNumberOfFollowers = 0
      state.temporaryNumberOfFollowings = 0
      state.temporaryFollowersPreview = []
      state.temporaryFollowingPreview = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserConnectionsIdsThunk.fulfilled,
      (
        state,
        action: PayloadAction<GetUserConnectionsIdsThunkReturnResult>
      ) => {
        state.fetchedAtStartup = true
        if (action.payload.temporary) {
          state.temporaryFollowersIds = action.payload.response.followers
          state.temporaryFollowingIds = action.payload.response.following
          state.temporaryNumberOfFollowers =
            action.payload.response.numberOfFollowers
          state.temporaryNumberOfFollowings =
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

export const {
  setUnfollowUser,
  setFollowUser,
  setIsLoading,
  setArbitrarySearchResult,
  clearTemporaryStoredData,
  setInputSearchText,
} = userConnectionsSlice.actions
export default userConnectionsSlice.reducer
