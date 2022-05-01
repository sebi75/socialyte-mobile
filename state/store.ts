import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import counterReducer from "./reducers/demoReducer"
import createPostReducer from "./reducers/createPostReducer"

const store = configureStore({
  reducer: {
    postData: createPostReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
