import { View, Text, StyleSheet, Dimensions } from "react-native"

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
    height,
    width,
    backgroundColor: "blue",
  },
})

export default DiscoverSearchScreen
