import { createNativeStackNavigator } from "@react-navigation/native-stack"

import FeedScreen from "../../screens/FeedScreen"
import CommentsModalScreen from "../../screens/CommentsModalScreen"

/* import settings */
import { FeedSettings } from "./settings"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"

/* COMPONENTS */
import { CustomIconButton } from "../../components/IconButton"
import CameraStackNavigator from "./CameraStackNavigator"
import InboxScreen from "../../screens/InboxScreen"
import CreatePostStackNavigator from "./CreatePostStackNavigator"

type RootStackParamList = {
  FeedScreen: undefined
  CommentsModal: undefined
  CameraStackNavigator: undefined
  InboxScreen: undefined
  CreatePostModal: undefined
}

const FeedStack = createNativeStackNavigator<RootStackParamList>()

const FeedStackNavigator: React.FC = () => {
  const navigation: any = useNavigation()

  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          title: FeedSettings.title,
          headerStyle: {
            backgroundColor: FeedSettings.backgroundColor,
          },
          headerTintColor: FeedSettings.titleColor,
          headerLeft: () => (
            <View>
              <CustomIconButton
                iconName={"ios-camera"}
                size={25}
                color={"white"}
                onPress={() => navigation.navigate("CameraStackNavigator")}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <CustomIconButton
                style={{ marginRight: 10 }}
                iconName={"ios-add-circle-outline"}
                size={25}
                color={"white"}
                onPress={() => navigation.navigate("CreatePostModal")}
              />
              <CustomIconButton
                iconName={"ios-send"}
                size={25}
                color={"white"}
                onPress={() => navigation.navigate("InboxScreen")}
              />
            </View>
          ),
        }}
      />
      {/* COMMENTS MODAL SCREEN */}
      <FeedStack.Group screenOptions={{ presentation: "modal" }}>
        <FeedStack.Screen
          name={"CommentsModal"}
          component={CommentsModalScreen}
          options={{
            title: "Comments: ",
            headerStyle: {
              backgroundColor: FeedSettings.backgroundColor,
            },
            headerTitleStyle: {
              color: FeedSettings.titleColor,
            },
            headerTintColor: FeedSettings.titleColor,
          }}
        />
      </FeedStack.Group>
      {/* CREATING A POST MODAL SCREEN */}
      <FeedStack.Screen
        name={"CreatePostModal"}
        component={CreatePostStackNavigator}
        options={{
          title: "Create a post: ",
          headerStyle: {
            backgroundColor: FeedSettings.backgroundColor,
          },
          headerTitleStyle: {
            color: FeedSettings.titleColor,
          },
          headerTintColor: FeedSettings.titleColor,
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name={"CameraStackNavigator"}
        component={CameraStackNavigator}
        options={{
          headerShown: false,
          //@ts-ignore
          gestureDirection: "horizontal-inverted",
        }}
      />
      <FeedStack.Screen
        name={"InboxScreen"}
        component={InboxScreen}
        options={{
          title: "Inbox",
          headerStyle: {
            backgroundColor: FeedSettings.backgroundColor,
          },
          headerTintColor: FeedSettings.titleColor,
        }}
      />
    </FeedStack.Navigator>
  )
}

export default FeedStackNavigator
