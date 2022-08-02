import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  ConnectionsType,
  getConnections,
} from "../../../firebase/database/connections/getConnections"
import {
  UserFollowArrayType,
  UserFollowPreviewType,
} from "../../../firebase/types"

//this thunk retrieves and returns the imported type: UserFollowArrayType

/* 
The logic here checks if the request is made with the same uid as the one in the state, that is the user's logged in and if not, then the previewUserFollowers of following will be stored in the temporary state instead of the user's
*/

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
        }
      } else {
        return {
          type: type,
          response: response,
          temporary: false,
        }
      }
    } catch (error: any) {
      console.log(error.message)
      throw new Error(`Error in getting the users ${type} ids`)
    }
  }
)

//export UserFollowArrayType,
//  UserFollowPreviewType,
export { UserFollowPreviewType, UserFollowArrayType }

export type UserConnectionsReturnResult = {
  response: UserFollowArrayType
  type: ConnectionsType
  temporary: boolean
}
