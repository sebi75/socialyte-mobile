import { createNativeStackNavigator } from "@react-navigation/native-stack"

import StartupScreen from "../../../screens/StartupScreen"
import BottomTabNavigator from "../../TabNavigators/BottomTabNavigator"
import AuthenticationStackNavigator from "../AuthenticationStackNavigator"

const StartupStack = createNativeStackNavigator()

const StartupStackNavigator: React.FC = () => {
  return (
    <StartupStack.Navigator
      screenOptions={{
        //disable swipe to go back from the main application
        //to the authstack when users are already logged in
        gestureEnabled: false,
      }}
    >
      <StartupStack.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{
          headerShown: false,
        }}
      />
      <StartupStack.Screen
        name={"AuthStackNavigator"}
        component={AuthenticationStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <StartupStack.Screen
        name={"BottomTabNavigator"}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </StartupStack.Navigator>
  )
}

export default StartupStackNavigator
