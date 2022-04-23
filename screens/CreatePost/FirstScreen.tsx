import { View, Button, StyleSheet, Dimensions, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { CustomButton } from "../../components/CustomButton"
import Colors from "../../constants/Colors"

const { width, height } = Dimensions.get("window")
const FirstScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }
  return (
    <View style={styles.screen}>
      {/* FIRST CONTAINER WHICH WILL CONTAIN AN IMAGE PREVIEW */}
      <View style={styles.imagePreviewContainer}>
        {image && <Image style={styles.imageStyle} source={{ uri: image }} />}
      </View>
      <View>
        <CustomButton title={"pick an image"} onPress={pickImageAsync} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: width,
    height: height,
    backgroundColor: Colors.dark,
  },
  imagePreviewContainer: {
    width: width,
    height: height * 0.5,
    backgroundColor: "green",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
})

export default FirstScreen
