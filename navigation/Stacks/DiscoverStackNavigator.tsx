import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Dimensions, Text } from "react-native"
import { CustomButton } from "../../components/CustomButton"

import MainDiscoverScreen from "../../screens/Discover/MainDiscoverScreen"
import DiscoverSearchComponent from "../../components/DiscoverSearchComponent"
import DiscoverSearchScreen from "../../screens/Discover/DiscoverSearchScreen"

import Colors from "../../constants/Colors"
import { TouchableOpacity } from "react-native-gesture-handler"
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
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("DiscoverSearchScreen")}
                style={{
                  width: width * 0.9,
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 7,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 15,
                  }}
                >
                  place your search...
                </Text>
              </TouchableOpacity>
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
      <DiscoverStack.Screen
        name="DiscoverSearchScreen"
        component={DiscoverSearchScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => {
            return <DiscoverSearchComponent width={width * 0.6} />
          },
          headerRight: () => {
            return (
              <CustomButton
                onPress={() => navigation.goBack()}
                title={"Cancel"}
              />
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
