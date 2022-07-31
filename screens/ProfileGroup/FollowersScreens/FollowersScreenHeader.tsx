import { View, StyleSheet, Dimensions } from "react-native"
import { default as InputSearchComponent } from "../../../components/DiscoverSearchComponent"

const { width, height } = Dimensions.get("window")
const FollowersScreenHeader: React.FC = () => {
  return (
    <View style={styles.screen}>
      <InputSearchComponent width={width * 0.8} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: height * 0.1,
  },
})

export default FollowersScreenHeader
