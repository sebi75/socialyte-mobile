import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  displayName: "",
  profilePicture: "",
  description: "",
}

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState: initialState,
  reducers: {
    setDisplayName: (state, action) => {
      state.displayName = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
  },
})

export const { setDisplayName, setDescription } = editProfileSlice.actions
export default editProfileSlice.reducer
