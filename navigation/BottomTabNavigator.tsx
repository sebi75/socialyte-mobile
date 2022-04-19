import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import FeedStackNavigator from "./Stacks/FeedStackNavigator"
import InboxScreen from "../screens/InboxScreen"
import CameraScreen from "../screens/CameraScreen"

const Tab = createMaterialTopTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      keyboardDismissMode={"on-drag"}
      tabBar={() => null}
    >
      <Tab.Screen name="CameraScreen" component={CameraScreen} />
      <Tab.Screen name="Feed" component={FeedStackNavigator} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
