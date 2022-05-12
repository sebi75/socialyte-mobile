import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"

import StartupStackNavigator from "./navigation/Stacks/start/StartupStack"

import { enableScreens } from "react-native-screens"
import { LogBox } from "react-native"
import { Provider } from "react-redux"
import store from "./state/store"

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])

enableScreens()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StartupStackNavigator />
      </NavigationContainer>
    </Provider>
  )
}
