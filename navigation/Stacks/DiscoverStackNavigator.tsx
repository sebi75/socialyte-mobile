import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dimensions, Text, StyleSheet, Platform } from "react-native"
import { CustomButton } from "../../components/CustomButton"

import MainDiscoverScreen from "../../screens/Discover/MainDiscoverScreen"
import DiscoverSearchComponent from "../../components/DiscoverSearchComponent"
import DiscoverSearchScreen from "../../screens/Discover/DiscoverSearchScreen"
import ProfileScreen from "../../screens/ProfileGroup/ProfileScreen"

import Colors from "../../constants/Colors"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useAppDispatch } from "../../state/store"
import { setUsersSearch } from "../../state/reducers/searchUsersReducer"
const DiscoverStack = createNativeStackNavigator()

//
//
/* BUG: Funky behavior with the cancel button in the header in the Searching screen */
//
//

const { width } = Dimensions.get("window")
const DiscoverStackNavigator = () => {
  const dispatch = useAppDispatch()
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name="MainDiscoverScreen"
        component={MainDiscoverScreen}
        options={({ navigation }) => ({
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("DiscoverSearchScreen")}
                style={styles.container}
              >
                <Text style={styles.text}>search for someone...</Text>
              </TouchableOpacity>
            )
          },
          title: "",
          headerStyle: {
            backgroundColor: Colors.dark,
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
      />
      <DiscoverStack.Screen
        name="DiscoverSearchScreen"
        component={DiscoverSearchScreen}
        options={({ navigation }) => ({
          headerLeft: () => {
            return <DiscoverSearchComponent width={width * 0.6} autoFocus />
          },
          headerRight: () => {
            return (
              <CustomButton
                onPress={() => {
                  navigation.goBack()
                  dispatch(setUsersSearch([]))
                }}
                title={"Cancel"}
                style={styles.button}
              />
            )
          },
          title: "",
          headerStyle: {
            backgroundColor: Colors.dark,
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
      />
      <DiscoverStack.Screen
        name="ProfileScreenSearched"
        component={ProfileScreen}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: route.params.username || "Profile",
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
            headerTintColor:
              Platform.OS === "android" ? Colors.primary : "white",
          },
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        })}
      />
    </DiscoverStack.Navigator>
  )
}

interface ProfileSettingsType {
  backgroundColor: string
  titleColor: string
}

export const ProfileSettings: ProfileSettingsType = {
  backgroundColor: Platform.OS === "ios" ? Colors.dark : Colors.dark,
  titleColor: "white",
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
  },
  button: {
    width: width * 0.3,
    position: "absolute",
    right: 0,
  },
})

export default DiscoverStackNavigator
