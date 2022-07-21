import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dimensions } from "react-native"
import { CustomButton } from "../../components/CustomButton"

import MainDiscoverScreen from "../../screens/Discover/MainDiscoverScreen"
import DiscoverSearchComponent from "../../components/DiscoverSearchComponent"
import DiscoverSearchScreen from "../../screens/Discover/DiscoverSearchScreen"

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
            return <DiscoverSearchComponent width={width * 0.9} />
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
        options={({ navigation, route }) => ({
          headerLeft: () => {
            return <DiscoverSearchComponent width={width * 0.6} />
          },
          headerRight: () => {
            return (
              <CustomButton onPress={navigation.goBack()} title={"Cancel"} />
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
    </DiscoverStack.Navigator>
  )
}

export default DiscoverStackNavigator
