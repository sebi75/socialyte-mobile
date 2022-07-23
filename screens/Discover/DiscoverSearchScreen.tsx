import { View, Text, StyleSheet, Dimensions } from "react-native"

import HideKeyboard from "../../components/HideKeyboard"
import SkeletonLoading from "../../components/Skeletons/SkeletonSearch"

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
        <SkeletonLoading>
          <Text>test results</Text>
        </SkeletonLoading>
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
