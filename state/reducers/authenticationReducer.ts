import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { signUpWithEmail } from "../../firebase/authentication/signUpWithEmail"

/* FIREBASE actions --> */
import { createUserDocumentAtSignup } from "../../firebase/database/createUser"

const userInitialState = {
  isAuthenticated: false,
  isLoading: false,
  username: "",
  email: "",
  uid: "",
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

    signUpWithEmailStart: (state) => {
      state.isLoading = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpWithEmailThunk.fulfilled, (state, action) => {
      console.log("action in the reducer Thunk: ")
      console.log(action)
    })
  },
})

export const { setUser, signUpWithEmailStart } = userSlice.actions

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
      const response: any = await signUpWithEmail(email, password)
      console.log(response)

      try {
        //create the user document in the db with first signup details
        //get the permanent user id from the response and username from input
        await createUserDocumentAtSignup(response.uid, response.email, username)
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
