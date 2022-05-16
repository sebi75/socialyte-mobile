import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"

const { width, height } = Dimensions.get("window")

interface PostPreviewPeops {
  imageURL: string
}

const PostPreview: React.FC<PostPreviewPeops> = ({ imageURL }) => {
  return (
    <TouchableOpacity style={styles.container}>
      {/* @ts-ignore */}
      <Image style={styles.imageStyle} source={imageURL} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: width * 0.33,
    height: width * 0.33,
    backgroundColor: "red",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
})

export default PostPreview
