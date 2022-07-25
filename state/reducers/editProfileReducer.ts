import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: "",
  photoURL: "",
  description: "",
  isLoading: false,
}

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setImageUri: (state, action) => {
      state.photoURL = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { setUsername, setDescription, setImageUri } =
  editProfileSlice.actions
export default editProfileSlice.reducer
