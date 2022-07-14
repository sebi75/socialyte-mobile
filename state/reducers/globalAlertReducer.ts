import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AlertProps {
  isVisible: boolean
  title: string
  subtitle: string
}

const initialState = {
  isVisible: false,
  title: "",
  subtitle: "",
}

const globalAlertSlice = createSlice({
  name: "globalAlert",
  initialState: initialState,
  reducers: {
    setGlobalAlertData: (state, action: PayloadAction<AlertProps>) => {
      state.isVisible = action.payload.isVisible
      state.title = action.payload.title
      state.subtitle = action.payload.subtitle
    },
  },
})

export const { setGlobalAlertData } = globalAlertSlice.actions
export default globalAlertSlice.reducer
