import { View, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

const InboxScreen: React.FC = (props) => {
  const navigation: any = useNavigation()
  return (
    <View>
      <Text>Inbox</Text>
    </View>
  )
}

export default InboxScreen
