import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { AuthenticationState } from "../types/Authentication"

/* thunks import */
import { signUpWithEmailThunk } from "../thunks/authentication/signUpWithEmailThunk"
import { signInWithEmailThunk } from "../thunks/authentication/signInWithEmailThunk"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { signOut } from "../../firebase/authentication/signOut."

/* user actions */
import { setUser, clearUserState } from "./userSlice"

const authenticationInitialState: AuthenticationState = {
  isAuthenticated: false,
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
      state.isAuthenticated = true
      state.isLoading = false
    })
    builder.addCase(signInWithEmailThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

export const { clearError } = userSlice.actions

//to be known:
// the createAsykcthunk doens't return only the value you return in it
// it returns a bigger object with the arguments sent, status and the thing
//you return is in the response.payload
export const signOutThunk = createAsyncThunk(
  "user/signOut",
  async (_, { dispatch }) => {
    try {
      await signOut()
      await AsyncStorage.removeItem("userData")
      dispatch(clearUserState())
    } catch (error) {
      console.log(
        "error in removing userData from the AsyncStorage or in signOut from firebase"
      )
    }
  }
)

export default userSlice.reducer
