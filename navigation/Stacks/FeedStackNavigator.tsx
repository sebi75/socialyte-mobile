import { createNativeStackNavigator } from "@react-navigation/native-stack"

import FeedScreen from "../../screens/Feed/FeedScreen"
import CommentsModalScreen from "../../screens/Comments/CommentsModalScreen"
import LikesModalScreen from "../../screens/Likes/LikesModalScreen"

import { View, Platform } from "react-native"
import Colors from "../../constants/Colors"

/* COMPONENTS */
import { CustomIconButton } from "../../components/IconButton"
import CameraStackNavigator from "./CameraStackNavigator"
import InboxScreen from "../../screens/Inbox/InboxScreen"
import CreatePostStackNavigator from "./CreatePostStackNavigator"
import ProfileScreen from "../../screens/ProfileGroup/ProfileScreen/ProfileScreen"
import FollowersScreen from "../../screens/ProfileGroup/FollowersScreens/FollowersScreen"
import IndividualPostScreen from "../../screens/IndividualPostScreen"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

/* get the data in the asyncstorage of current signed user */
import testAsync from "../../utils/testAsync"

const FeedStack = createNativeStackNavigator()

const FeedStackNavigator: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <FeedStack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
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
              {/* <CustomIconButton
                style={{ marginRight: 10 }}
                iconName={"ios-add-circle-outline"}
                size={25}
                color={"white"}
                onPress={testAsync}
              /> */}
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
          initialParams={{
            postId: "",
          }}
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
        <FeedStack.Screen
          name={"LikesModal"}
          initialParams={{
            postId: "",
          }}
          component={LikesModalScreen}
          options={{
            title: "Likes: ",
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

      <FeedStack.Screen
        name="PostScreen"
        component={IndividualPostScreen}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: "Post",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
      />

      <FeedStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: "Profile",
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
          },
          headerTintcolor: "white",
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        })}
      />
      <FeedStack.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        initialParams={{ uid: user.uid, type: "followers" }}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: "Followers",
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        })}
      />
      <FeedStack.Screen
        name="FollowingScreen"
        component={FollowersScreen}
        initialParams={{ uid: user.uid, type: "following" }}
        options={({ navigation, route }: { navigation: any; route: any }) => ({
          title: "Following",
          headerStyle: {
            backgroundColor: ProfileSettings.backgroundColor,
          },
          headerTintColor: "white",
          headerTitleStyle: {
            color: ProfileSettings.titleColor,
          },
        })}
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

interface ProfileSettingsType {
  backgroundColor: string
  titleColor: string
}

export const ProfileSettings: ProfileSettingsType = {
  backgroundColor: Platform.OS === "ios" ? Colors.dark : Colors.dark,
  titleColor: "white",
}

export default FeedStackNavigator
