import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileScreen from "../../screens/ProfileGroup/ProfileScreen/ProfileScreen"
import SettingsModal from "../../screens/ProfileGroup/SettingsScreen/SettingsModal"
import EditScreen from "../../screens/ProfileGroup/EditScreen/EditScreen"
import IndividualPostScreen from "../../screens/IndividualPostScreen"
import FollowersScreen from "../../screens/ProfileGroup/FollowersScreens/FollowersScreen"

import { CustomIconButton } from "../../components/IconButton"
import { Platform } from "react-native"
import Colors from "../../constants/Colors"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

//
//
/* Because of the initialParams in ProfileScreen, there seems to be a little bug. */
//
//

const ProfileStack = createNativeStackNavigator()

const ProfileStackNavigator: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      <ProfileStack.Screen
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
          title: route.params.uid != user.uid ? "Profile" : "Your Profile",
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
          },
          headerTintcolor: "white",
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        })}
      />
      <ProfileStack.Screen
        name="SettingsModal"
        component={SettingsModal}
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <ProfileStack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <ProfileStack.Screen
        name="PostScreen"
        component={IndividualPostScreen}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: "Post",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
      />
      <ProfileStack.Screen
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
      <ProfileStack.Screen
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
    </ProfileStack.Navigator>
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

export default ProfileStackNavigator
