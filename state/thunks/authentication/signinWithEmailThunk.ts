import { signInWithEmail } from "../../../firebase/authentication/signInWithEmail"
import { createAsyncThunk } from "@reduxjs/toolkit"

import { setUser } from "../../reducers/userSlice"
import { getUserData } from "../../../firebase/database/user/getUserData"
import { User } from "../../../firebase/types/User"

export const signInWithEmailThunk = createAsyncThunk(
  "auth/signInWithEmail",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ): Promise<User | undefined> => {
    const { dispatch } = thunkAPI

    try {
      const response: any = await signInWithEmail(email, password)
      console.log({ response })
      const userDocument = await getUserData(response.uid)
      if (userDocument) {
        dispatch(
          setUser({
            email,
            uid: response.uid,
            description: userDocument.description,
            username: userDocument.username,
            profilePicture: userDocument.profilePicture,
          })
        )

        return userDocument // return userDocumentData of type User
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
)
