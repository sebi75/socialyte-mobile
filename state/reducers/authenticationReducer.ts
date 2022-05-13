import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { signUpWithEmail } from "../../firebase/authentication/signUpWithEmail"

/* FIREBASE actions --> */
import { createUserDocumentAtSignup } from "../../firebase/database/createUser"

const userInitialState = {
  isAuthenticated: false,
  username: "",
  email: "",
  uid: "",
}

export const signUpWithEmailThunk = createAsyncThunk(
  "auth/signUpWithEmail",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response: any = await signUpWithEmail(email, password)
      console.log("got here with response: ")
      console.log(response)

      try {
        await createUserDocumentAtSignup(response.user.uid)
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
    builder.addCase(signUpWithEmailThunk.fulfilled, (state, action) => {
      const { user } = action.payload
      state.isAuthenticated = true
      state.username = user.username
      state.email = user.email
      state.uid = user.uid
    })
  },
})

export default userSlice.reducer
