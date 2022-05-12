import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignupScreen from "../../screens/Authentication/SignupScreen"
import SigninScreen from "../../screens/Authentication/SignInScreen"

const AuthenticationStack = createNativeStackNavigator()

const AuthenticationStackNavigator: React.FC = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="SignupScreen"
        component={SignupScreen}
      />
      <AuthenticationStack.Screen name="LoginScreen" component={SigninScreen} />
    </AuthenticationStack.Navigator>
  )
}

export default AuthenticationStackNavigator
