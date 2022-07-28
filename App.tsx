import { NavigationContainer } from "@react-navigation/native"

import StartupStackNavigator from "./navigation/Stacks/start/StartupStack"
import GlobalAlert from "./components/GlobalAlert"

import { enableScreens } from "react-native-screens"
import { LogBox } from "react-native"
import { Provider } from "react-redux"
import store from "./state/store"

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
])

LogBox.ignoreLogs(["Setting a timer"])

enableScreens()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StartupStackNavigator />
      </NavigationContainer>
      <GlobalAlert />
    </Provider>
  )
}
