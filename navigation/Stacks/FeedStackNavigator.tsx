import { createNativeStackNavigator } from "@react-navigation/native-stack"

import FeedScreen from "../../screens/FeedScreen"
import CommentsModalScreen from "../../screens/CommentsModalScreen"

/* import settings */
import { FeedSettings } from "./settings"
import { useNavigation } from "@react-navigation/native"

/* COMPONENTS */
import { CustomIconButton } from "../../components/IconButton"

type RootStackParamList = {
  FeedScreen: undefined
  CommentsModal: undefined
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
              onPress={() => navigation.jumpTo("CameraScreen")}
            />
          ),
          headerRight: () => (
            <CustomIconButton
              iconName={"ios-send"}
              size={25}
              color={"white"}
              onPress={() => navigation.jumpTo("InboxScreen")}
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
    </FeedStack.Navigator>
  )
}

export default FeedStackNavigator
