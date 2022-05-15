import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { BlurView } from "expo-blur"

import FeedStackNavigator from "../Stacks/FeedStackNavigator"
import StoriesStackNavigator from "../Stacks/StoriesStackNavigator"
import DiscoverStackNavigator from "../Stacks/DiscoverStackNAvigator"
import ProfileStackNavigator from "../Stacks/ProfileStackNavigator"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarBackground: () => {
            return <BlurView tint="dark" intensity={90} style={{ flex: 1 }} />
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
            if (focused) {
              return <Ionicons name={"ios-home"} size={25} color={"white"} />
            }
            return (
              <Ionicons name={"ios-home-outline"} size={25} color={"white"} />
            )
          },
        }}
      />
      <Tab.Screen
        name="DiscoverStackNavigator"
        component={DiscoverStackNavigator}
        options={{
          tabBarStyle: {
            position: "absolute",
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <Feather name="search" size={25} color="white" />
          },
        }}
      />
      <Tab.Screen
        name="StoriesStackNavigator"
        component={StoriesStackNavigator}
        options={{
          tabBarStyle: {
            position: "absolute",
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            if (!focused) {
              return (
                <Ionicons name="ios-book-outline" size={25} color="white" />
              )
            }
            return <Ionicons name={"ios-book"} size={25} color={"white"} />
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
            if (focused) {
              return (
                <MaterialCommunityIcons name={"face"} size={25} color="white" />
              )
            } else {
              return (
                <MaterialCommunityIcons
                  name={"face-outline"}
                  size={25}
                  color="white"
                />
              )
            }
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
