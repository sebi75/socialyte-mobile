import { View, Text } from "react-native"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

interface InboxScreenProps {
  navigation: any
  route: any
}

const InboxScreen: React.FC<InboxScreenProps> = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: "none",
      },
      tabBarVisible: false,
    })
  }, [])
  return (
    <View>
      <Text>Inbox</Text>
    </View>
  )
}

export default InboxScreen
