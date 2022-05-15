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

import HideKeyboard from "../../components/HideKeyboard"

const { width, height } = Dimensions.get("window")
const MainDiscoverScreen: React.FC = (props) => {
  return (
    <HideKeyboard>
      <View style={styles.screen}>
        <Text>Discover</Text>
      </View>
    </HideKeyboard>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "red",
  },
})

export default MainDiscoverScreen
