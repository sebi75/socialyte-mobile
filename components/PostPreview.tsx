import { StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
const { width } = Dimensions.get("window")

interface PostPreviewProps {
  mediaURL: string
  username: string
  postDescription: string
  profilePicture: string
  createdAt: number
  postId: string
  postOwner: string
  likes: string[]
}

const PostPreview: React.FC<PostPreviewProps> = ({
  mediaURL,
  username,
  postDescription,
  profilePicture,
  createdAt,
  postId,
  postOwner,
  likes,
}) => {
  const navigation: any = useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("PostScreen", {
          postOwner,
          username,
          postDescription,
          profilePicture,
          likes,
          mediaURL,
          createdAt,
          postId,
        })
      }
    >
      <Image style={styles.imageStyle} source={{ uri: mediaURL }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: width * 0.33,
    height: width * 0.33,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
})

export default PostPreview
