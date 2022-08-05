import { StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
const { width } = Dimensions.get("window")

interface PostPreviewProps {
  imageURL: string
}

const PostPreview: React.FC<PostPreviewProps> = ({ imageURL }) => {
  const navigation: any = useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("PostScreen", { title: "Sebastian Semeniuc" })
      }
    >
      <Image style={styles.imageStyle} source={{ uri: imageURL }} />
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
