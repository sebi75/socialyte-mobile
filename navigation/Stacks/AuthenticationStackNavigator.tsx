import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignupScreen from "../../screens/Authentication/SignUpScreen"
import SigninScreen from "../../screens/Authentication/SignInScreen"

import { CustomIconButton } from "../../components/IconButton"
import { NavigationContainer } from "@react-navigation/native"

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
      <AuthenticationStack.Screen name="LoginScreen" component={SigninScreen} />
    </AuthenticationStack.Navigator>
  )
}

export default AuthenticationStackNavigator
