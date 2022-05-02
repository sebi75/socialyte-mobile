import { useAppDispatch } from "../state/store"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"

import store from "../state/store"

export default () => {
  const data = store.getState()
  console.log(data)
}
