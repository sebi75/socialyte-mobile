import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native"

import UserSearchResult from "../../Discover/components/UserSearchResult"
import { default as InputSearchComponent } from "../../../components/DiscoverSearchComponent"
import { ScrollView } from "react-native-gesture-handler"

interface FollowersScreenProps {
  type: "followers" | "following"
}

const { width, height } = Dimensions.get("window")
const FollowersScreen: React.FC = () => {
  return (
    <ScrollView>
      <InputSearchComponent width={width * 0.8} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default FollowersScreen
