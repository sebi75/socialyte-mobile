import { createContext } from "react"

interface IGlobalContext {
  message: string
}

const defaultState = {
  message: "Hello",
}

export const GlobalState = createContext<IGlobalContext>(defaultState)

const GlobalStateProvider: React.FC = ({ children }) => {
  const stateSample = {
    message: "hello",
  }

  return (
    <GlobalState.Provider value={stateSample}>{children}</GlobalState.Provider>
  )
}

export default GlobalStateProvider
