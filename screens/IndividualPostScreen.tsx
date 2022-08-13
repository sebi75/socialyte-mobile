import { View, StyleSheet, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import FeedPost from "../components/FeedPost"

interface IndividualPostScreenProps {
  route: {
    params: {
      postOwner: string
      username: string
      postDescription: string
      mediaURL: string
      createdAt: string
      postId: string
    }
  }
}

const { width, height } = Dimensions.get("window")
const IndividualPostScreen: React.FC<IndividualPostScreenProps> = ({
  route,
}) => {
  const { postOwner, username, postDescription, mediaURL, createdAt, postId } =
    route.params
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <FeedPost {...route.params} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default IndividualPostScreen
