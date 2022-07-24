import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileScreen from "../../screens/ProfileGroup/ProfileScreen"
import SettingsModal from "../../screens/ProfileGroup/SettingsModal"
import EditScreen from "../../screens/ProfileGroup/EditScreen/EditScreen"
import PostScreen from "../../screens/ProfileGroup/Post/PostScreen"

import { CustomIconButton } from "../../components/IconButton"
import { Platform } from "react-native"
import Colors from "../../constants/Colors"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const ProfileStack = createNativeStackNavigator()

const ProfileStackNavigator: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{ uid: user.uid, username: user.username }}
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
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        })}
      />
      <ProfileStack.Group screenOptions={{ presentation: "modal" }}>
        <ProfileStack.Screen
          name="SettingsModal"
          component={SettingsModal}
          options={{
            title: "Settings",
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: Platform.OS === "android" ? "white" : "black",
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
      </ProfileStack.Group>
      <ProfileStack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          title: "Edit Profile",
          headerTintColor: Platform.OS === "android" ? "black" : "white",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <ProfileStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: route.params.title,
          headerTintColor: Platform.OS === "android" ? "white" : "black",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
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
