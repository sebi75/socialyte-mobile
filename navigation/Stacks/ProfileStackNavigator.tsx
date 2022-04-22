import { createNativeStackNavigator } from "@react-navigation/native-stack"

import ProfileScreen from "../../screens/ProfileScreen"
import { ProfileSettings } from "./settings"

const ProfileStack = createNativeStackNavigator()

const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Sebastian Semeniuc",
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
          },
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        }}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackNavigator
