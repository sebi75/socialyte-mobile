import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignupScreen from "../../screens/Authentication/SignupScreen"
import SigninScreen from "../../screens/Authentication/SigninScreen"

import { CustomIconButton } from "../../components/IconButton"

const AuthenticationStack = createNativeStackNavigator()

const AuthenticationStackNavigator: React.FC = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={({ navigation, route }) => ({
          headerRight: () => {
            return (
              <CustomIconButton
                iconName={"ios-home"}
                color={"black"}
                size={25}
                onPress={() => navigation.navigate("BottomTabNavigator")}
              />
            )
          },
          headerShown: false,
        })}
      />
      <AuthenticationStack.Screen
        name="LoginScreen"
        component={SigninScreen}
        options={({ navigation, route }) => ({
          headerShown: false,
        })}
      />
    </AuthenticationStack.Navigator>
  )
}

export default AuthenticationStackNavigator
