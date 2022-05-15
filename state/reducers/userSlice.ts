import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserState } from "../types/User"

const userInitialState: UserState = {
  isAuthenticated: false,
  profilePicture: undefined,
  username: undefined,
  email: undefined,
  uid: undefined,
}

interface SetUserProps {
  email: string
  uid: string
  username: string
}

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserProps>) => {
      const { username, email, uid } = action.payload

      state.username = username
      state.email = email
      state.uid = uid
      state.isAuthenticated = true
    },

    clearUserState: (state) => {
      state.isAuthenticated = false
      state.profilePicture = undefined
      state.username = undefined
      state.email = undefined
      state.uid = undefined
    },
  },
  extraReducers: {},
})

export const { setUser, clearUserState } = userSlice.actions
export default userSlice.reducer
