import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TextInput, Dimensions } from "react-native"
import MainDiscoverScreen from "../../screens/Discover/MainDiscoverScreen"

import DiscoverSearchComponent from "../../components/DiscoverSearchComponent"

import Colors from "../../constants/Colors"
const DiscoverStack = createNativeStackNavigator()

const { width, height } = Dimensions.get("window")
const DiscoverStackNavigator = () => {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name="MainDiscoverScreen"
        component={MainDiscoverScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => {
            return <DiscoverSearchComponent />
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
    </DiscoverStack.Navigator>
  )
}

export default DiscoverStackNavigator
