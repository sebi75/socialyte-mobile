import { View, StyleSheet, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import FeedPost from "../components/FeedPost"
import Colors from "../constants/Colors"

interface IndividualPostScreenProps {
  route: {
    params: {
      postOwner: string
      username: string
      postDescription: string
      profilePicture: string
      uid: string
      likes: string[]
      mediaURL: string
      createdAt: number
      postId: string
    }
  }
}

const { width, height } = Dimensions.get("window")
const IndividualPostScreen: React.FC<IndividualPostScreenProps> = ({
  route,
}) => {
  const {
    postOwner,
    username,
    postDescription,
    mediaURL,
    createdAt,
    postId,
    profilePicture,
    likes,
  } = route.params
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.dark,
      }}
    >
      <View style={styles.screen}>
        <FeedPost {...route.params} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    width,
    height: height * 0.87,
    justifyContent: "center",
    backgroundColor: Colors.dark,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default IndividualPostScreen
