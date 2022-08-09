import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  ConnectionsType,
  getConnections,
} from "../../../firebase/database/connections/getConnections"
import {
  UserFollowArrayType,
  UserFollowPreviewType,
} from "../../../firebase/types"

export const getUserConnectionsThunk = createAsyncThunk(
  "userConnections/getUserConnectionsThunk",
  async (
    { uid, type }: { uid: string; type: ConnectionsType },
    thunkAPI: any
  ): Promise<UserConnectionsReturnResult> => {
    try {
      const response = await getConnections(uid, type)

      if (uid != thunkAPI.getState().user.uid) {
        return {
          type: type,
          response: response,
          temporary: true,
          uid: uid,
        }
      } else {
        console.log({ yes: "got here", response: response })
        return {
          type: type,
          response: response,
          temporary: false,
          uid: uid,
        }
      }
    } catch (error: any) {
      console.log(error.message)
      throw new Error(`Error in getting the users ${type} ids`)
    }
  }
)

export { UserFollowPreviewType, UserFollowArrayType }

export type UserConnectionsReturnResult = {
  response: UserFollowArrayType
  type: ConnectionsType
  temporary: boolean
  uid: string
}
