import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import FeedStackNavigator from "../Stacks/FeedStackNavigator"
import InboxScreen from "../../screens/InboxScreen"
import CameraScreen from "../../screens/CameraScreen"
import BottomTabNavigator from "./BottomTabNavigator"

/* 
!!!!!!!!!
CURRENTLY NOT IN USE
*/

const Tab = createMaterialTopTabNavigator()

/* THE NAVIGATOR THAT IT'S NOT VISIBLE AND IT SERVES FOR INBOX - FEED - CAMERA STACKS */

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="FeedStackNavigator"
      keyboardDismissMode={"on-drag"}
      tabBar={() => null}
    >
      <Tab.Screen name="CameraScreen" component={CameraScreen} />
      <Tab.Screen name="FeedStackNavigator" component={FeedStackNavigator} />
      <Tab.Screen name="InboxScreen" component={InboxScreen} />
    </Tab.Navigator>
  )
}

export default TopTabNavigator
