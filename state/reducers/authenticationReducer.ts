import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { signUpWithEmail } from "../../firebase/authentication/signUpWithEmail"

import { UserState } from "../types/User"

/* FIREBASE actions --> */
import { createUserDocumentAtSignup } from "../../firebase/database/createUser"
import { SignUpWithEmailResult } from "../../firebase/authentication/signUpWithEmail"

import AsyncStorage from "@react-native-async-storage/async-storage"

const userInitialState: UserState = {
  isAuthenticated: false,
  isLoading: false,
  profilePicture: undefined,
  username: undefined,
  error: undefined,
  email: undefined,
  uid: undefined,
}

interface SetUserProps {
  email: string
  uid: string
  username: string
}

const userSlice = createSlice({
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
    clearError: (state) => {
      state.error = undefined
    },

    clearUserState: (state) => {
      state.isAuthenticated = false
      state.isLoading = false
      state.profilePicture = undefined
      state.username = undefined
      state.error = undefined
      state.email = undefined
      state.uid = undefined
    },
  },

  extraReducers: (builder) => {
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
  },
})

export const { setUser, clearError, clearUserState } = userSlice.actions

//to be known:
// the createAsykcthunk doens't return only the value you return in it
// it returns a bigger object with the arguments sent, status and the thing
//you return is in the response.payload
export const signOutThunk = createAsyncThunk(
  "user/signOut",
  async (_, { dispatch }) => {
    try {
      await AsyncStorage.removeItem("userData")
      dispatch(clearUserState())
    } catch (error) {
      console.log("error in removing userData from the AsyncStorage")
    }
  }
)

export const signUpWithEmailThunk = createAsyncThunk(
  "auth/signUpWithEmail",
  async (
    {
      email,
      password,
      username,
    }: { email: string; password: string; username: string },
    thunkAPI
  ): Promise<SignUpWithEmailResult> => {
    const { dispatch } = thunkAPI

    try {
      const response: SignUpWithEmailResult = await signUpWithEmail(
        email,
        password
      )

      try {
        //create the user document in the db with first signup details
        //get the permanent user id from the response and username from input
        if (response != undefined) {
          const { uid, email } = response
          await createUserDocumentAtSignup(uid, email, username)
        }
      } catch (error) {
        throw Error(
          "An error occured when creating a new document for new signed up user"
        )
      }

      return response
    } catch (error) {
      throw Error("User with that email already exists!")
    }
  }
)

export default userSlice.reducer
