import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import StackNavigator from "./Stacks/StackNavigator"
import InboxScreen from "../screens/InboxScreen"
import CameraScreen from "../screens/CameraScreen"

const Tab = createMaterialTopTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      keyboardDismissMode={"on-drag"}
      tabBar={() => null}
    >
      <Tab.Screen name="CameraScreen" component={CameraScreen} />
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
