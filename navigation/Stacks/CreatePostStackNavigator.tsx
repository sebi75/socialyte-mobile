import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Colors from "../../constants/Colors"

import FirstScreen from "../../screens/CreatePost/FirstScreen"
import { CustomIconButton } from "../../components/IconButton"
import { CustomButton } from "../../components/CustomButton"

const CreatePostStack = createNativeStackNavigator()

const CreatePostStackNavigator = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  return (
    <CreatePostStack.Navigator>
      <CreatePostStack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{
          title: "Create Post",
          headerStyle: {
            backgroundColor: Colors.dark,
          },
          headerTintColor: "white",
          headerLeft: () => {
            return (
              <CustomIconButton
                iconName={"arrow-back"}
                color={"white"}
                size={30}
                onPress={() => navigation.goBack()}
              />
            )
          },
          headerRight: () => {
            return (
              <CustomButton
                title={"Next"}
                onPress={() => console.log("Next")}
              />
            )
          },
        }}
      />
    </CreatePostStack.Navigator>
  )
}

export default CreatePostStackNavigator
