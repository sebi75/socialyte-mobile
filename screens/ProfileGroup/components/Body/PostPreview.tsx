import { NavigationContainer } from "@react-navigation/native"
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")

interface PostPreviewPeops {
  imageURL: string
}

const PostPreview: React.FC<PostPreviewPeops> = ({ imageURL }) => {
  const navigation: any = useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("PostScreen", { title: "Sebastian Semeniuc" })
      }
    >
      {/* @ts-ignore */}
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
