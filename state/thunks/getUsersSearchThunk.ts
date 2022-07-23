import { createAsyncThunk } from "@reduxjs/toolkit"

import { getUsersSearch as getUsersSearchHandler } from "../../firebase/database/search/searchUser"

import { User } from "../../firebase/types/User"

export const getUsersSearchThunk = createAsyncThunk(
  "usersSearch/getUsersSearch",
  async (searchParam: string, thunkAPI): Promise<Array<User>> => {
    try {
      const response: Array<User> = await getUsersSearchHandler(searchParam)
      return response
    } catch (error: any) {
      console.log("Error in getting the users search")
      console.log(error.message)
      throw new Error("Error in getting user posts")
    }
  }
)
