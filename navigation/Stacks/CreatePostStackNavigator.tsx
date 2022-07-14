import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Colors from "../../constants/Colors"

import FirstScreen from "../../screens/CreatePost/FirstScreen"
import SecondScreen from "../../screens/CreatePost/SecondScreen"

import { CustomIconButton } from "../../components/IconButton"
import { CustomButton } from "../../components/CustomButton"

import { sharePost } from "./functions/sharePost"
import { useAppDispatch } from "../../state/store"
import {
  setIsLoading,
  clearCaption,
  clearImageUri,
} from "../../state/reducers/createPostReducer"

import { setGlobalAlertData } from "../../state/reducers/globalAlertReducer"

const CreatePostStack = createNativeStackNavigator()

const CreatePostStackNavigator = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const dispatch = useAppDispatch()

  const sharePostHandler = async () => {
    dispatch(setIsLoading(true))
    try {
      await sharePost()
      dispatch(setIsLoading(false))
      dispatch(clearCaption())
      dispatch(clearImageUri())
      navigation.navigate("FeedScreen")
    } catch (error: any) {
      dispatch(
        setGlobalAlertData({
          isVisible: true,
          title: "Oops,",
          subtitle: "Something went wrong",
        })
      )
      dispatch(setIsLoading(false))
    }
  }

  return (
    <CreatePostStack.Navigator>
      <CreatePostStack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={({ route }: { route: any }) => ({
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
                title={"Continue"}
                onPress={() => navigation.navigate("SecondScreen")}
              />
            )
          },
        })}
      />
      <CreatePostStack.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={({ route }) => ({
          title: "Set Bio",
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
                onPress={() => navigation.navigate("FirstScreen")}
              />
            )
          },
          headerRight: () => {
            return (
              <CustomButton title={"Share Post"} onPress={sharePostHandler} />
            )
          },
        })}
      />
    </CreatePostStack.Navigator>
  )
}

export default CreatePostStackNavigator
