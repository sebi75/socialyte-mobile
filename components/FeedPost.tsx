import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import Colors from "../constants/Colors"

import { CustomIconButton } from "./IconButton"
import { Avatar } from "react-native-paper"

import { useNavigation } from "@react-navigation/native"

interface FeedPostProps {
  username: string
  postDescription: string
  profilePicture: string
  mediaURL: string
  createdAt: string
  postId: string
  postOwner: string
}

const { width } = Dimensions.get("window")

const FeedPost: React.FC<FeedPostProps> = (props) => {
  const {
    username,
    postDescription,
    mediaURL,
    createdAt,
    postId,
    postOwner,
    profilePicture,
  } = props
  const navigation: any = useNavigation()

  return (
    <View style={styles.screen}>
      <View style={styles.postContainer}>
        {/* FIRST LINE */}
        <TouchableOpacity
          style={styles.firstLine}
          onPress={() =>
            navigation.navigate("ProfileScreen", {
              uid: postOwner,
              username: username,
              profilePicture: profilePicture,
              description: postDescription,
            })
          }
        >
          <AvatarPicture profilePicture={profilePicture} />
          <Text style={styles.usernameStyle}>{username}</Text>
        </TouchableOpacity>
        {/* SECOND LINE a.k.a. post image line */}
        <View>
          {/* @ts-ignore */}
          <Image style={styles.postImage} source={{ uri: mediaURL }} />
        </View>
        {/* THIRD LINE a.k.a. likes and comments icons */}
        <View style={styles.thirdLine}>
          {/* like button */}
          <View>
            <CustomIconButton
              iconName={"ios-heart-outline"}
              size={25}
              color={"white"}
              onPress={() => console.log("button clicked")}
            />
          </View>
          {/* comment button */}
          <View style={{ marginLeft: 10 }}>
            <CustomIconButton
              size={25}
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

const AvatarPicture: React.FC<{ profilePicture: string | null }> = ({
  profilePicture,
}) => {
  return profilePicture ? (
    <Avatar.Image
      size={40}
      source={{
        uri: profilePicture,
      }}
    />
  ) : (
    <Avatar.Image
      size={40}
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/socialyte-baas.appspot.com/o/images%2Fdefault.png?alt=media&token=703d1382-8bb7-49e2-9dd0-8c7aeb8a8f74",
      }}
    />
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
