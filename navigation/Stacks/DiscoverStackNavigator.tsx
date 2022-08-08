import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  Dimensions,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native"
import { CustomButton } from "../../components/CustomButton"

import MainDiscoverScreen from "../../screens/Discover/MainDiscoverScreen"
import DiscoverSearchComponent from "../../components/InputSearchComponent"
import DiscoverSearchScreen from "../../screens/Discover/DiscoverSearchScreen"
import ProfileScreen from "../../screens/ProfileGroup/ProfileScreen/ProfileScreen"
import FollowersScreen from "../../screens/ProfileGroup/FollowersScreens/FollowersScreen"

import Colors from "../../constants/Colors"
import { useAppDispatch } from "../../state/store"
import { RootState } from "../../state/store"
import { useSelector } from "react-redux"
import { setUsersSearch } from "../../state/reducers/searchUsersReducer"
import { CustomIconButton } from "../../components/IconButton"
const DiscoverStack = createNativeStackNavigator()

const { width } = Dimensions.get("window")
const DiscoverStackNavigator = () => {
  const user = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()
  return (
    <DiscoverStack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
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
                buttonStyle={styles.button}
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
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{
          uid: user.uid,
          username: user.username,
          description: user.description,
          profilePicture: user.profilePicture,
        }}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          headerRight: () => {
            if (route.params.uid == user.uid) {
              return (
                <CustomIconButton
                  iconName={"settings"}
                  color={"white"}
                  onPress={() => navigation.navigate("SettingsModal")}
                  size={25}
                />
              )
            }
          },
          title: route.params.username,
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
          },
          headerTintcolor: "white",
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        })}
      />

      <DiscoverStack.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        initialParams={{ uid: user.uid, type: "followers" }}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: "Followers",
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        })}
      />
      <DiscoverStack.Screen
        name="FollowingScreen"
        component={FollowersScreen}
        initialParams={{ uid: user.uid, type: "following" }}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: "Following",
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
          },
          headerTintColor: "white",
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
