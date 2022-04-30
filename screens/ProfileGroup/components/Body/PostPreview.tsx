import { View, Image, StyleSheet, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

interface PostPreviewPeops {
  imageURL: string
}

const PostPreview: React.FC<PostPreviewPeops> = ({ imageURL }) => {
  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Image style={styles.imageStyle} source={imageURL} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "green",
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
