import { createAsyncThunk } from "@reduxjs/toolkit"

import { signUpWithEmail } from "../../../firebase/authentication/signUpWithEmail"
import { createUserDocumentAtSignup } from "../../../firebase/database/createUser"

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

      try {
        //create the user document in the db with first signup details
        //get the permanent user id from the response and username from input
        if (response != undefined) {
          const { uid, email } = response
          await createUserDocumentAtSignup(uid, email, username)

          dispatch(setUser({ email, uid: response.uid, username }))
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
