import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FeedScreen from "../../screens/FeedScreen"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
/* import settings */
import { FeedSettings } from "../settings"
import { useNavigation } from "@react-navigation/native"

type RootStackParamList = {
  Feed: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: FeedSettings.title,
          headerStyle: {
            backgroundColor: FeedSettings.backgroundColor,
          },
          headerTintColor: FeedSettings.titleColor,
          headerRight: () => <HeaderButton iconName={"ios-star-outline"} />,
        }}
      />
    </Stack.Navigator>
  )
}

interface HeaderButtonProps {
  iconName: string
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ iconName }) => {
  const navigation: any = useNavigation()
  const handlePress = () => {
    console.log(navigation)
    navigation.jumpTo("Inbox")
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons name={"ellipse"} size={25} color="#fcba03" />
    </TouchableOpacity>
  )
}

export default StackNavigator
