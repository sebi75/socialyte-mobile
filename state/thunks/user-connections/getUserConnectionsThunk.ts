import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  ConnectionsType,
  getConnections,
} from "../../../firebase/database/connections/getConnections"
import { UserFollowArrayType } from "../../../firebase/types"

//this thunk retrieves and returns the imported type: UserFollowArrayType

export const getUserConnectionsThunk = createAsyncThunk(
  "userSearchHistory/getUserSearchHistory",
  async (
    type: ConnectionsType,
    thunkAPI
  ): Promise<UserConnectionsReturnResult> => {
    try {
      const response = await getConnections(type)
      return { response, type }
    } catch (error: any) {
      console.log(error.message)
      throw new Error(`Error in getting the users ${type} ids`)
    }
  }
)

export type UserConnectionsReturnResult = {
  response: UserFollowArrayType
  type: ConnectionsType
}
