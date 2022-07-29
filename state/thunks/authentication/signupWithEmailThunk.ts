import { createAsyncThunk } from "@reduxjs/toolkit"

import { signUpWithEmail } from "../../../firebase/authentication/signUpWithEmail"
import { createUserDocumentAtSignup } from "../../../firebase/database/user/createUser"

import { SignUpWithEmailResult } from "../../../firebase/authentication/signUpWithEmail"
import { User } from "../../../firebase/types/User"

import { getUserData } from "../../../firebase/database/user/getUserData"

export const signUpWithEmailThunk = createAsyncThunk(
  "auth/signUpWithEmail",
  async (
    {
      email,
      password,
      username,
    }: { email: string; password: string; username: string },
    thunkAPI
  ): Promise<User | undefined> => {
    try {
      const response: SignUpWithEmailResult = await signUpWithEmail(
        email,
        password
      )

      if (response) {
        const { uid, email } = response
        await createUserDocumentAtSignup(uid, email, username)

        const userDocument = await getUserData(response.uid)
        return userDocument
      }
    } catch (error) {
      throw Error("User with that email already exists!")
    }
  }
)
