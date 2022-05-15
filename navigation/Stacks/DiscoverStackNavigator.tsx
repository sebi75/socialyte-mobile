import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainDiscoverScreen from "../../screens/Discover/MainDiscoverScreen"

const DiscoverStack = createNativeStackNavigator()

const DiscoverStackNavigator = () => {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name="MainDiscoverScreen"
        component={MainDiscoverScreen}
      />
    </DiscoverStack.Navigator>
  )
}

export default DiscoverStackNavigator
