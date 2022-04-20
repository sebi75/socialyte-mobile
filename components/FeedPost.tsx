import { View, Text, Dimensions, StyleSheet, Image } from "react-native"
import Colors from "../constants/Colors"

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
          <Text style={styles.usernameStyle}>{username}</Text>
        </View>
        {/* SECOND LINE a.k.a. post image line */}
        <View>
          {/* @ts-ignore */}
          <Image style={styles.postImage} source={imageURL} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: width,
    backgroundColor: Colors.dark,
    alignItems: "center",
    marginVertical: 50,
  },
  postContainer: {
    width: width * 0.8,
  },
  firstLine: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    height: 55,
    alignItems: "center",
  },
  avatarImage: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  postImage: {
    width: "100%",
    height: width * 0.8,
    borderRadius: 10,
  },
  usernameStyle: {
    fontSize: 15,
    color: "white",
  },
})

export default FeedPost
