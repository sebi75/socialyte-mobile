import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CreatePostInterface {
  imageUri: string | undefined
  isLoading: boolean
  caption: string | undefined
}

const initialState: CreatePostInterface = {
  imageUri: undefined,
  caption: undefined,
  isLoading: false,
}

export const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    setImageUri: (state, action: PayloadAction<string>) => {
      state.imageUri = action.payload
    },
    clearImageUri: (state) => {
      state.imageUri = undefined
    },
    setCaption: (state, action: PayloadAction<string>) => {
      state.caption = action.payload
    },
    clearCaption: (state) => {
      state.caption = undefined
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setImageUri,
  setCaption,
  clearCaption,
  clearImageUri,
  setIsLoading,
} = createPostSlice.actions
export default createPostSlice.reducer
