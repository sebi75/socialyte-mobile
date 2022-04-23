import { createNativeStackNavigator } from "@react-navigation/native-stack"

import FeedScreen from "../../screens/FeedScreen"
import CommentsModalScreen from "../../screens/CommentsModalScreen"

/* import settings */
import { FeedSettings } from "./settings"
import { useNavigation } from "@react-navigation/native"

/* COMPONENTS */
import { CustomIconButton } from "../../components/IconButton"
import CameraScreen from "../../screens/CameraScreen"
import InboxScreen from "../../screens/InboxScreen"

type RootStackParamList = {
  FeedScreen: undefined
  CommentsModal: undefined
  CameraScreen: undefined
  InboxScreen: undefined
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
            <CustomIconButton
              iconName={"ios-camera"}
              size={25}
              color={"white"}
              onPress={() => navigation.navigate("CameraScreen")}
            />
          ),
          headerRight: () => (
            <CustomIconButton
              iconName={"ios-send"}
              size={25}
              color={"white"}
              onPress={() => navigation.navigate("InboxScreen")}
            />
          ),
        }}
      />
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
          }}
        />
      </FeedStack.Group>
      <FeedStack.Screen
        name={"CameraScreen"}
        component={CameraScreen}
        options={{
          headerShown: false,
          //@ts-ignore
          gestureDirection: "horizontal",
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
