import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  getUserFollowIds,
  UserConnectionType,
} from "../../../firebase/database/connections/getUserFollowIds"

//this thunk retrieves and returns an array of uids for both followers and following, based on what it is requested

export const getUserConnectionsIdsThunk = createAsyncThunk(
  "userConnections/getUserConnectionsIdsThunk",
  async (
    { uid, type }: { uid: string; type: UserConnectionType },
    thunkAPI
  ): Promise<UserConnectionsReturnResult> => {
    console.log("calling the gettingUserConnectionsIdsThunk!!!!")
    try {
      let response: string[] = await getUserFollowIds(uid, type)
      if (response == undefined) {
        response = []
      }
      return { type, ids: response }
    } catch (error: any) {
      console.log(error.message)
      throw new Error(`Error in getting the users ${type} ids`)
    }
  }
)

export type UserConnectionsReturnResult = {
  ids: string[]
  type: UserConnectionType
}
