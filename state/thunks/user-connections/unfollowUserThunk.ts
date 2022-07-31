import { createAsyncThunk } from "@reduxjs/toolkit"
import { unfollowUser } from "../../../firebase/database/connections/unfollowUser"

export const unfollowUserThunk = createAsyncThunk(
  "userSearchHistory/getUserSearchHistory",
  async (
    { uid, userToUnfollowId }: { uid: string; userToUnfollowId: string },
    thunkAPI: any
  ): Promise<boolean> => {
    try {
      const response = await unfollowUser(uid, userToUnfollowId)
      return true
    } catch (error: any) {
      console.log(error.message)
      throw new Error(`Error when unfollowing user ${userToUnfollowId}`)
    }
  }
)
