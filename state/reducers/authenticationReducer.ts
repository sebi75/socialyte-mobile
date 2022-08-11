import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { AuthenticationState } from "../types/Authentication"

/* thunks import */
import { signUpWithEmailThunk } from "../thunks/authentication/signUpWithEmailThunk"
import { signInWithEmailThunk } from "../thunks/authentication/signInWithEmailThunk"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { signOut } from "../../firebase/authentication/signOut."

/* user actions */
import { clearUserState } from "./userSlice"

const authenticationInitialState: AuthenticationState = {
  isLoading: false,
  error: undefined,
}

const userSlice = createSlice({
  name: "authentication",
  initialState: authenticationInitialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined
    },
  },

  extraReducers: (builder) => {
    //signup builder cases
    builder.addCase(signUpWithEmailThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(signUpWithEmailThunk.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(signUpWithEmailThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    //signin builder cases
    builder.addCase(signInWithEmailThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(signInWithEmailThunk.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(signInWithEmailThunk.rejected, (state, action) => {
      state.isLoading = false
      if (action.error.message == "auth/user-not-found") {
        state.error = "Error: User not found"
      } else if (action.error.message == "auth/wrong-password") {
        state.error = "Error: Wrong password"
      } else if (action.error.message == "auth/too-many-requests") {
        state.error = "Error: Too many requests"
      } else {
        state.error = action.error.message
      }
    })
  },
})

export const { clearError } = userSlice.actions

export const signOutThunk = createAsyncThunk(
  "user/signOut",
  async (_, { dispatch }) => {
    try {
      await signOut()
      dispatch(clearUserState())
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
)

export default userSlice.reducer
