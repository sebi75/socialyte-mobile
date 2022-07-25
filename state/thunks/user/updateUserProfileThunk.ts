import {
  updateProfile,
  UpdatedFields,
} from "../../../firebase/database/user/updateProfile"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../../firebase/types/User"

export const updateUserProfileThunk = createAsyncThunk(
  "usersSearch/getUsersSearch",
  async (
    { uid, updatedFields }: { uid: string; updatedFields: UpdatedFields },
    thunkAPI
  ): Promise<User> => {
    try {
      const response: User = await updateProfile(uid, updatedFields)
      return response
    } catch (error: any) {
      throw new Error("ERROR in thunk updating users profile")
    }
  }
)
