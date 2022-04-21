import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import FeedStackNavigator from "../Stacks/FeedStackNavigator"
import ProfileScreen from "../../screens/ProfileScreen"
import FeedScreen from "../../screens/FeedScreen"

/* SETTINGS */
import BottomTabSettings from "./settings"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...BottomTabSettings,
      }}
    >
      {/* SERVES AS THE MAIN ENTRY TO FEED */}
      <Tab.Screen name="FeedStackNavigator" component={FeedStackNavigator} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
