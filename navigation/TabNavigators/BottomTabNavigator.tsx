import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import TopTabNavigator from "./TopTabNavigator"
import ProfileScreen from "../../screens/ProfileScreen"

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
      <Tab.Screen name="TopTabNavigator" component={TopTabNavigator} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
