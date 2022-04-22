import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import BottomTabNavigator from "./navigation/TabNavigators/BottomTabNavigator"
import { LogBox } from "react-native"
import TopTabNavigator from "./navigation/TabNavigators/TopTabNavigator"

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
