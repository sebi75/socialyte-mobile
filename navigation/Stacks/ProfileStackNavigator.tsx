import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileScreen from "../../screens/ProfileGroup/ProfileScreen"
import SettingsModal from "../../screens/ProfileGroup/SettingsModal"

import { ProfileSettings } from "./settings"

import { CustomIconButton } from "../../components/IconButton"

const ProfileStack = createNativeStackNavigator()

const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          headerRight: () => {
            return (
              <CustomIconButton
                iconName={"settings"}
                color={"white"}
                onPress={() => navigation.navigate("SettingsModal")}
                size={25}
              />
            )
          },
          title: "Sebastian Semeniuc",
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
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  )
}

export default ProfileStackNavigator
