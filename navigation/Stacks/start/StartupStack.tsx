import { createNativeStackNavigator } from "@react-navigation/native-stack"

import StartupScreen from "../../../screens/StartupScreen"
import BottomTabNavigator from "../../TabNavigators/BottomTabNavigator"

const StartupStack = createNativeStackNavigator()

const StartupStackNavigator: React.FC = () => {
  return (
    <StartupStack.Navigator>
      <StartupStack.Screen name="StartupScreen" component={StartupScreen} />
      <StartupStack.Screen
        name={"BottomTabNavigator"}
        component={BottomTabNavigator}
      />
    </StartupStack.Navigator>
  )
}

export default StartupStackNavigator
