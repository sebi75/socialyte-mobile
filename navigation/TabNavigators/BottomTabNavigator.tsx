import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { BlurView } from "expo-blur"

import FeedStackNavigator from "../Stacks/FeedStackNavigator"
import StoriesStackNavigator from "../Stacks/StoriesStackNavigator"
import DiscoverStackNavigator from "../Stacks/DiscoverStackNavigator"
import ProfileStackNavigator from "../Stacks/ProfileStackNavigator"
import { Platform, View } from "react-native"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => {
        return {
          tabBarBackground: () => {
            return Platform.OS === "android" ? (
              <View style={{ backgroundColor: "black" }} />
            ) : (
              <BlurView tint="dark" intensity={95} style={{ flex: 1 }} />
            )
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "black",
          },
        }
      }}
    >
      {/* SERVES AS THE MAIN ENTRY TO FEED */}
      <Tab.Screen
        name="FeedStackNavigator"
        component={FeedStackNavigator}
        options={{
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
          tabBarShowLabel: false,
          headerShown: false,
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
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
