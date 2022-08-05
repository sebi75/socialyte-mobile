import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  getUserFollowIds,
  GetUserFollowIdsResult,
} from "../../../firebase/database/connections/getUserFollowIds"

//this thunk retrieves and returns an array of uids for both followers and following, based on what it is requested

export const getUserConnectionsIdsThunk = createAsyncThunk(
  "userConnections/getUserConnectionsIdsThunk",
  async (
    uid: string,
    thunkAPI: any
  ): Promise<GetUserConnectionsIdsThunkReturnResult> => {
    try {
      let response = await getUserFollowIds(uid)
      if (uid != thunkAPI.getState().user.uid) {
        return {
          response: response,
          temporary: true,
        }
      } else {
        return { response: response, temporary: false }
      }
    } catch (error: any) {
      console.log(error.message)
      throw new Error(`Error in getting the users connection ids`)
    }
  }
)

export type GetUserConnectionsIdsThunkReturnResult = {
  response: GetUserFollowIdsResult
  temporary: boolean
}
