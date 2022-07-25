import { createAsyncThunk } from "@reduxjs/toolkit"

import { signUpWithEmail } from "../../../firebase/authentication/signUpWithEmail"
import { createUserDocumentAtSignup } from "../../../firebase/database/user/createUser"

import { SignUpWithEmailResult } from "../../../firebase/authentication/signUpWithEmail"
import { setUser } from "../../reducers/userSlice"

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

      if (response) {
        const { uid, email } = response
        await createUserDocumentAtSignup(uid, email, username)

        dispatch(
          setUser({
            email,
            uid: response.uid,
            username,
            profilePicture: "",
            description: "",
          })
        )
      }

      return response
    } catch (error) {
      throw Error("User with that email already exists!")
    }
  }
)
