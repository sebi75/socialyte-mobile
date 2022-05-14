import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { signUpWithEmail } from "../../firebase/authentication/signUpWithEmail"

/* FIREBASE actions --> */
import { createUserDocumentAtSignup } from "../../firebase/database/createUser"
import { SignUpWithEmailResult } from "../../firebase/authentication/signUpWithEmail"

const userInitialState = {
  isAuthenticated: false,
  isLoading: false,
  profilePicture: undefined,
  username: undefined,
  error: undefined,
  email: undefined,
  uid: undefined,
}

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.username = action.payload.username
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpWithEmailThunk.pending, (state, action) => {
      console.log("started loading state")
      state.isLoading = true
    })
    builder.addCase(signUpWithEmailThunk.fulfilled, (state, action) => {
      console.log("stopping the loading state: ")
      state.isLoading = false
      console.log(action)
    })
  },
})

export const { setUser } = userSlice.actions

export const signUpWithEmailThunk = createAsyncThunk(
  "auth/signUpWithEmail",
  async (
    {
      email,
      password,
      username,
    }: { email: string; password: string; username: string },
    thunkAPI
  ) => {
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
      throw Error("error in signing up a new user!")
    }
  }
)

export default userSlice.reducer
