import { View, StyleSheet, Dimensions } from "react-native"
import InputSearchComponent from "./InputSearchComponent"

type HeaderType = "followers" | "following"

interface FollowersScreenHeaderProps {
  type: HeaderType
  uid: string
}

const { width, height } = Dimensions.get("window")
const FollowersScreenHeader: React.FC<FollowersScreenHeaderProps> = ({
  type,
  uid,
}) => {
  return (
    <View style={styles.screen}>
      <InputSearchComponent width={width * 0.8} type={type} uid={uid} />
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
