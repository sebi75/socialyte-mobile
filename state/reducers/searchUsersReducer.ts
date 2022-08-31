import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../firebase/types/User"

/* THUNKS */
import { getUsersSearchThunk } from "../thunks/search/getUsersSearchThunk"
import { getUsersSearchHistoryThunk } from "../thunks/search/getUsersSearchHistoryThunk"
import { UserSearchHistoryResults } from "../../firebase/database/search/getUserSearchHistory"

interface SearchUsersState {
  users: Array<User>
  isLoading: boolean
  error: string | undefined
  historyUsers: UserSearchHistoryResults
  historyError: string | undefined
}

const initialState: SearchUsersState = {
  isLoading: false,
  error: undefined,
  historyError: undefined,
  users: [],
  historyUsers: [],
}

const usersSearch = createSlice({
  name: "usersSearch",
  initialState: initialState,
  reducers: {
    setUsersSearch: (state, action: PayloadAction<Array<User> | []>) => {
      state.users = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clearSearchUsersSliceState: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersSearchThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(
      getUsersSearchThunk.fulfilled,
      (state, action: PayloadAction<Array<User>>) => {
        state.isLoading = false
        state.users = action.payload
      }
    )
    builder.addCase(getUsersSearchThunk.rejected, (state, action: any) => {
      state.isLoading = false
      state.error = action.payload
    })

    builder.addCase(getUsersSearchHistoryThunk.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(
      getUsersSearchHistoryThunk.fulfilled,
      (state, action: PayloadAction<UserSearchHistoryResults>) => {
        state.isLoading = false
        state.historyUsers = action.payload
      }
    )
    builder.addCase(
      getUsersSearchHistoryThunk.rejected,
      (state, action: any) => {
        state.isLoading = false
        state.error = action.payload
      }
    )
  },
})

export const { setUsersSearch, setIsLoading, clearSearchUsersSliceState } =
  usersSearch.actions
export default usersSearch.reducer
