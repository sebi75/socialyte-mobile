import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileScreen from "../../screens/ProfileGroup/ProfileScreen"
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
                onPress={() => console.log("open settings drawer / something")}
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
    </ProfileStack.Navigator>
  )
}

export default ProfileStackNavigator
