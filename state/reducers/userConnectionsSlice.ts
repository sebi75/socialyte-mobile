import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { updateUserProfileThunk } from "../thunks/user/updateUserProfileThunk"

import { ConnectionsUserDocumentType, User, UserFollowersArrayType, UserFollowersPreviewType } from "../../firebase/types"

export type ConnectionsUserDocumentTypeData = 

const userConnectionsInitialState: ConnectionsUserDocumentType = {
    followers: [],
    following: [],
}

export const connectionsSlice = createSlice({
  name: "user",
  initialState: userConnectionsInitialState,
  reducers: {},
  extraReducers:{},
})

export default connectionsSlice.reducer
