import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Colors from "../../constants/Colors"

import FirstScreen from "../../screens/CreatePost/FirstScreen"
import SecondScreen from "../../screens/CreatePost/SecondScreen"

import { CustomIconButton } from "../../components/IconButton"
import { CustomButton } from "../../components/CustomButton"

import { uploadImage } from "../../firebase/storage"

const CreatePostStack = createNativeStackNavigator()

const CreatePostStackNavigator = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const sharePostPrototype = () => {
    //need the user id, the image, the caption, the date
    //no to have a "posts" field in a user's document
    //bacause we will query for his posts using his id in the "posts" collection
    //upload the image to firebase storage
    //get the url of the image
    //create a post object
    //upload the post object to firebase
    //navigate to the home screen
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
              <CustomButton
                title={"Share Post"}
                onPress={() => console.log("share post")}
              />
            )
          },
        })}
      />
    </CreatePostStack.Navigator>
  )
}

export default CreatePostStackNavigator
