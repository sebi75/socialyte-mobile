import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import ProfileStackNavigator from "../Stacks/ProfileStackNavigator"
import TopTabNavigator from "./TopTabNavigator"

import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"

/* SETTINGS */
import BottomTabSettings from "./settings"

import FeedStackNavigator from "../Stacks/FeedStackNavigator"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        if (route.name == "CameraScreen") {
          console.log(route.name)
          return {
            tabBarVisible: false,
          }
        }
        return {
          tabBarBackground: () => {
            return <BlurView tint="dark" intensity={85} style={{ flex: 1 }} />
          },
          headerShown: false,
        }
      }}
    >
      {/* SERVES AS THE MAIN ENTRY TO FEED */}
      <Tab.Screen
        name="FeedStackNavigator"
        component={FeedStackNavigator}
        options={{
          tabBarStyle: {
            position: "absolute",
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <Ionicons name={"ios-home"} size={25} color={"white"} />
          },
        }}
      />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name={"add-circle-outline"} size={25} color={"white"} />
            )
          },
          tabBarBackground: () => (
            <BlurView tint="dark" intensity={85} style={{ flex: 1 }} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
