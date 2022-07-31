import { View, StyleSheet, Dimensions } from "react-native"
import InputSearchComponent from "../../../components/InputSearchComponent"

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
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default FollowersScreenHeader
