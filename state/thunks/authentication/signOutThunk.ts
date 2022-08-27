import { createAsyncThunk } from "@reduxjs/toolkit"
import { signOut } from "../../../firebase/authentication/signOut."

export const signOutThunk = createAsyncThunk(
  "user/signOut",
  async (_, { dispatch }) => {
    try {
      await signOut()
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
)
