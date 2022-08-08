import { View, Text, Dimensions, StyleSheet, Image } from "react-native"
import Colors from "../constants/Colors"
import { CustomIconButton } from "./IconButton"
import { useNavigation } from "@react-navigation/native"

interface FeedPostProps {
  username: string
  caption: string
  imageURL: string
  avatarImage: string
}

const { width } = Dimensions.get("window")

const FeedPost: React.FC<FeedPostProps> = (props) => {
  const { username, caption, imageURL, avatarImage } = props
  const navigation: any = useNavigation()

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
        {/* THIRD LINE a.k.a. likes and comments icons */}
        <View style={styles.thirdLine}>
          {/* like button */}
          <View>
            <CustomIconButton
              iconName={"ios-heart-outline"}
              size={31}
              color={"white"}
              onPress={() => console.log("button clicked")}
            />
          </View>
          {/* comment button */}
          <View style={{ marginLeft: 10 }}>
            <CustomIconButton
              size={31}
              iconName={"ios-chatbubbles"}
              color={"white"}
              onPress={() => navigation.navigate("CommentsModal")}
            />
          </View>
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
  },
  postContainer: {
    width: width,
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
    backgroundColor: "white",
    borderRadius: 50,
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
    marginLeft: 7,
  },
  thirdLine: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
  },
})

export default FeedPost
