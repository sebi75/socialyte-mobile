import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  getUsersSearchHistory,
  UserSearchHistoryResults,
} from "../../../firebase/database/search/getUserSearchHistory"

export const getUsersSearchHistoryThunk = createAsyncThunk(
  "userSearchHistory/getUserSearchHistory",
  async (uid: string, thunkAPI): Promise<UserSearchHistoryResults> => {
    try {
      const response: UserSearchHistoryResults = await getUsersSearchHistory(
        uid
      )
      return response
    } catch (error: any) {
      console.log("Error in getting the users search history")
      console.log(error.message)
      throw new Error("Couldn't get history")
    }
  }
)
