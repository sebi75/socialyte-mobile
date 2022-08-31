import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"

import Colors from "../constants/Colors"
import { formatDateNow } from "../utils/timeAgo"

import { Avatar } from "react-native-paper"

import { useNavigation } from "@react-navigation/native"

interface FeedPostProps {
  uid: string
  username: string
  postDescription: string
  profilePicture: string
  mediaURL: string
  createdAt: number
  postId: string
  postOwner: string
  likes: string[]
}

const { width } = Dimensions.get("window")

const DiscoverPostComponent: React.FC<FeedPostProps> = (props) => {
  const {
    username,
    postDescription,
    mediaURL,
    createdAt,
    postOwner,
    profilePicture,
  } = props
  const navigation: any = useNavigation()

  const timeAgo = formatDateNow(createdAt)

  return (
    <View style={styles.screen}>
      <View style={styles.postContainer}>
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
          <View style={styles.firstLineLeftSide}>
            <AvatarPicture profilePicture={profilePicture} />
            <Text style={styles.usernameStyle}>{username}</Text>
          </View>
          <Text style={styles.firstLineRightSide}>
            {parseInt(timeAgo) < 0 ? "Just now" : `${timeAgo} ago`}
          </Text>
        </TouchableOpacity>
        <View>
          <Image style={styles.postImage} source={{ uri: mediaURL }} />
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
    width: width * 0.48,
    backgroundColor: Colors.dark,
    alignItems: "center",
  },
  postContainer: {
    width: "100%",
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
    height: width * 0.8 * 0.49,
    borderRadius: 10,
  },
  usernameStyle: {
    fontSize: 15,
    color: "white",
    marginLeft: 7,
  },
  firstLine: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstLineLeftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  firstLineRightSide: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
})

export default DiscoverPostComponent
