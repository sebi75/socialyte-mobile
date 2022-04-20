import { View, Text, Dimensions, StyleSheet, Image } from "react-native"
import tw from "twrnc"

interface FeedPostProps {
  username: string
  caption: string
  imageURL: string
  avatarImage: string
}

const { width, height } = Dimensions.get("window")

const FeedPost: React.FC<FeedPostProps> = (props) => {
  const { username, caption, imageURL, avatarImage } = props
  return (
    <View style={styles.screen}>
      <View style={styles.postContainer}>
        {/* FIRST LINE */}
        <View style={styles.firstLine}>
          <Image style={styles.avatarImage} source={{ uri: avatarImage }} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: width,
    backgroundColor: "blue",
    alignItems: "center",
    marginVertical: 15,
  },
  postContainer: {
    width: width * 0.8,
    backgroundColor: "white",
  },
  firstLine: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    backgroundColor: "green",
  },
  avatarImage: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default FeedPost
