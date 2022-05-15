import { signInWithEmail } from "../../../firebase/authentication/signInWithEmail"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { SignInWithEmailResult } from "../../../firebase/authentication/signInWithEmail"
import { setUser } from "../../reducers/userSlice"

export const signInWithEmailThunk = createAsyncThunk(
  "auth/signInWithEmail",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ): Promise<SignInWithEmailResult> => {
    const { dispatch } = thunkAPI

    try {
      const response: SignInWithEmailResult = await signInWithEmail(
        email,
        password
      )
      if (response) {
        dispatch(setUser({ email, uid: response.uid, username: "" }))
      }

      return response
    } catch (error: any) {
      const errorMessage = error.message
      const errorCode = error.code
      console.log(
        "Error in authenticating with following errorMessage and code: "
      )
      console.log(errorMessage)
      console.log(errorCode)
    }
  }
)
