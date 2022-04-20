import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FeedScreen from "../../screens/FeedScreen"
/* import settings */
import { FeedSettings } from "../settings"
import { useNavigation } from "@react-navigation/native"

/* COMPONENTS */
import { CustomIconButton } from "../../components/IconButton"

type RootStackParamList = {
  Feed: undefined
}

const FeedStack = createNativeStackNavigator<RootStackParamList>()

const FeedStackNavigator: React.FC = () => {
  const navigation: any = useNavigation()

  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
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
    </FeedStack.Navigator>
  )
}

export default FeedStackNavigator
