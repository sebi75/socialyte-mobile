import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import FeedStackNavigator from "../Stacks/FeedStackNavigator"
import InboxScreen from "../../screens/InboxScreen"
import CameraScreen from "../../screens/CameraScreen"
import BottomTabNavigator from "./BottomTabNavigator"

const Tab = createMaterialTopTabNavigator()

/* THE NAVIGATOR THAT IT'S NOT VISIBLE AND IT SERVES FOR INBOX - FEED - CAMERA STACKS */

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="BottomTabNavigator"
      keyboardDismissMode={"on-drag"}
      tabBar={() => null}
    >
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Tab.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  )
}

export default TopTabNavigator
