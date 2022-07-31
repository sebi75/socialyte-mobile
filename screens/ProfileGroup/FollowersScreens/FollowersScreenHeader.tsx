import { View, StyleSheet, Dimensions } from "react-native"
import InputSearchComponent from "./InputSearchComponent"

type HeaderType = "followers" | "following"

interface FollowersScreenHeaderProps {
  type: HeaderType
}

const { width, height } = Dimensions.get("window")
const FollowersScreenHeader: React.FC<FollowersScreenHeaderProps> = ({
  type,
}) => {
  return (
    <View style={styles.screen}>
      <InputSearchComponent width={width * 0.8} type={type} />
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
