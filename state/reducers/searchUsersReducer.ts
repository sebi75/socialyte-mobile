import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../firebase/types/User"

/* THUNKS */
import { getUsersSearchThunk } from "../thunks/getUsersSearchThunk"

interface SearchUsersState {
  users: Array<User>
  isLoading: boolean
  error: string | undefined
}

const initialState: SearchUsersState = {
  isLoading: false,
  error: undefined,
  users: [],
}

const usersSearch = createSlice({
  name: "usersSearch",
  initialState: initialState,
  reducers: {
    setUsersSearch: (state, action: PayloadAction<Array<User>>) => {
      state.users = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
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
  },
})

export const { setUsersSearch, setIsLoading } = usersSearch.actions
export default usersSearch.reducer
