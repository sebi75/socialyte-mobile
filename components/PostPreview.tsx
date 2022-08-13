import { StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
const { width } = Dimensions.get("window")

interface PostPreviewProps {
  mediaURL: string
  username: string
  postDescription: string
  createdAt: string
  postId: string
  postOwner: string
}

const PostPreview: React.FC<PostPreviewProps> = ({
  mediaURL,
  username,
  postDescription,
  createdAt,
  postId,
  postOwner,
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
