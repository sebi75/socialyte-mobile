import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FeedScreen from "../../screens/FeedScreen"
/* import settings */
import { FeedSettings } from "../settings"
import { useNavigation } from "@react-navigation/native"

/* COMPONENTS */
import { CustomHeaderButton } from "../../components/HeaderButton"

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
          headerRight: () => (
            <CustomHeaderButton
              iconName={"ios-send"}
              color={"white"}
              onPress={() => navigation.jumpTo("Inbox")}
            />
          ),
        }}
      />
    </FeedStack.Navigator>
  )
}

export default FeedStackNavigator
