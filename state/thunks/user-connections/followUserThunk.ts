import { createAsyncThunk } from "@reduxjs/toolkit"
import { followUser } from "../../../firebase/database/connections/followUser"

export const followUserThunk = createAsyncThunk(
  "userConnections/followUserThunk",
  async (
    { uid, userToFollowId }: { uid: string; userToFollowId: string },
    thunkAPI: any
  ): Promise<boolean> => {
    try {
      const response = await followUser(uid, userToFollowId)
      return true
    } catch (error: any) {
      console.log(error.message)
      throw new Error(`Error when following user ${userToFollowId}`)
    }
  }
)
