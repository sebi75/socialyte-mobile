import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserState } from "../types/User"
import { updateUserProfileThunk } from "../thunks/user/updateUserProfileThunk"

const userInitialState: UserState = {
  isAuthenticated: false,
  isUpdatingLoading: false,
  profilePicture: undefined,
  description: undefined,
  username: undefined,
  email: undefined,
  uid: undefined,
}

interface SetUserProps {
  email: string
  uid: string
  username: string
  description: string
  profilePicture: string
}

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserProps>) => {
      const { username, email, uid, description, profilePicture } =
        action.payload
      state.description = description
      state.profilePicture = profilePicture
      state.username = username
      state.email = email
      state.uid = uid
      state.isAuthenticated = true
    },

    clearUserState: (state) => {
      state.isAuthenticated = false
      state.profilePicture = undefined
      state.username = undefined
      state.description = undefined
      state.email = undefined
      state.uid = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfileThunk.pending, (state, action) => {
      state.isUpdatingLoading = true
    }),
      builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        const { username, profilePicture, description } = action.payload
        state.isUpdatingLoading = false
        state.username = username
        state.profilePicture = profilePicture
        state.description = description
      }),
      builder.addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.isUpdatingLoading = false
      })
  },
})

export const { setUser, clearUserState } = userSlice.actions
export default userSlice.reducer
