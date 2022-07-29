import { createAsyncThunk } from "@reduxjs/toolkit"

import { signUpWithEmail } from "../../../firebase/authentication/signUpWithEmail"
import { createUserDocumentAtSignup } from "../../../firebase/database/user/createUser"

import { SignUpWithEmailResult } from "../../../firebase/authentication/signUpWithEmail"
import { setUser } from "../../reducers/userSlice"

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
  ): Promise<SignUpWithEmailResult> => {
    try {
      const response: SignUpWithEmailResult = await signUpWithEmail(
        email,
        password
      )

      if (response) {
        const { uid, email } = response
        await createUserDocumentAtSignup(uid, email, username)

        const userDocument = await getUserData(response.uid)
        if (userDocument) {
          setUser({
            email,
            uid: response.uid,
            description: userDocument.description,
            username: userDocument.username,
            profilePicture: userDocument.profilePicture,
          })
        }
      }

      return response
    } catch (error) {
      throw Error("User with that email already exists!")
    }
  }
)
