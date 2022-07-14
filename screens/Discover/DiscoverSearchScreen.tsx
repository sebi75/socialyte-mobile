import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native"

import HideKeyboard from "../../components/HideKeyboard"

//
//
/* this screen should render results with user profiles from searches */
//
//

const { width, height } = Dimensions.get("window")
const DiscoverSearchScreen: React.FC = (props) => {
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
    backgroundColor: "black",
  },
})

export default DiscoverSearchScreen
