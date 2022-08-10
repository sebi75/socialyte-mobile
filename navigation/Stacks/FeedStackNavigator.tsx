import { createNativeStackNavigator } from "@react-navigation/native-stack"

import FeedScreen from "../../screens/Feed/FeedScreen"
import CommentsModalScreen from "../../screens/Feed/CommentsModalScreen"

import { View, Platform } from "react-native"
import Colors from "../../constants/Colors"

/* COMPONENTS */
import { CustomIconButton } from "../../components/IconButton"
import CameraStackNavigator from "./CameraStackNavigator"
import InboxScreen from "../../screens/Inbox/InboxScreen"
import CreatePostStackNavigator from "./CreatePostStackNavigator"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"

/* REDUX: */
import { useAppDispatch } from "../../state/store"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

import testAsync from "../../utils/testAsync"

type RootStackParamList = {
  FeedScreen: undefined
  CommentsModal: undefined
  CameraStackNavigator: undefined
  InboxScreen: undefined
  CreatePostModal: undefined
}

const FeedStack = createNativeStackNavigator<RootStackParamList>()

const FeedStackNavigator: React.FC = () => {
  const { uid } = useSelector((state: RootState) => state.user)
  console.log(uid)
  const dispatch = useAppDispatch()

  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={({ navigation }) => ({
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
                onPress={testAsync}
              />
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
        })}
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
          animation: "slide_from_bottom",
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

interface FeedSettingsType {
  title: string
  backgroundColor: string
  titleColor: string
}

export const FeedSettings: FeedSettingsType = {
  title: "Socialyte",
  backgroundColor: Platform.OS === "ios" ? Colors.dark : Colors.dark,
  titleColor: "white",
}

export default FeedStackNavigator
