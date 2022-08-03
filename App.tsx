import { NavigationContainer } from "@react-navigation/native"

import StartupStackNavigator from "./navigation/Stacks/start/StartupStack"
import GlobalAlert from "./components/GlobalAlert"

import { enableScreens } from "react-native-screens"
import { LogBox } from "react-native"
import { Provider } from "react-redux"
import store from "./state/store"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useCallback } from "react"
import { getUserConnectionsIdsThunk } from "./state/thunks/user-connections/getUserConnectionIdsThunk"

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
])

LogBox.ignoreLogs(["Setting a timer"])

enableScreens()

export default function App() {
  const asyncFetchUserData = useCallback(async () => {
    try {
      console.log("fething the user data from the async storage")
      const userdata = await fetchUserFromAsyncStorage()
      console.log(userdata)
    } catch (error) {
      console.log("error in fethching user data", error)
    }
  }, [])

  useEffect(() => {
    asyncFetchUserData()

    setTimeout(() => {
      if (!store.getState().userConnections.fetchedAtStartup) {
        console.log("fetching the user connections ids at startup...")
        store.dispatch(
          getUserConnectionsIdsThunk(store.getState().user.uid as string)
        )
        /*         store.dispatch(
          getUserConnectionsIdsThunk({
            uid: store.getState().user.uid as string,
            type: "following",
          })
        ) */
      }
    }, 200)
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StartupStackNavigator />
      </NavigationContainer>
      <GlobalAlert />
    </Provider>
  )
}

const fetchUserFromAsyncStorage = async () => {
  const loggedInUser: any = await AsyncStorage.getItem("loggedInUser")
  if (loggedInUser) {
    const parsedLoggedInUser = JSON.parse(loggedInUser)
    const cachedUserData = AsyncStorage.getItem(parsedLoggedInUser.uid)

    return cachedUserData
  } else {
    return null
  }
}
