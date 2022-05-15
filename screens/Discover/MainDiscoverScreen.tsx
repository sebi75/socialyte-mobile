import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native"

const { width, height } = Dimensions.get("window")
const MainDiscoverScreen: React.FC = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Discover</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "red",
  },
})

export default MainDiscoverScreen
