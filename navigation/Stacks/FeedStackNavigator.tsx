import { createNativeStackNavigator } from "@react-navigation/native-stack"

import FeedScreen from "../../screens/Feed/FeedScreen"
import CommentsModalScreen from "../../screens/Feed/CommentsModalScreen"

/* import settings */
import { FeedSettings } from "./settings"
import { View } from "react-native"

/* COMPONENTS */
import { CustomIconButton } from "../../components/IconButton"
import CameraStackNavigator from "./CameraStackNavigator"
import InboxScreen from "../../screens/Inbox/InboxScreen"
import CreatePostStackNavigator from "./CreatePostStackNavigator"

/* REDUX: */
import { useAppDispatch } from "../../state/store"
import { signOutThunk } from "../../state/reducers/authenticationReducer"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

import { getUserPostsThunk } from "../../state/thunks/userPosts/getUserPostsThunk"

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
                iconName={"search"}
                size={25}
                color={"white"}
                onPress={() =>
                  dispatch(getUserPostsThunk({ uid: uid as string }))
                }
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

export default FeedStackNavigator
