import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
  Button,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { CustomButton } from "../../components/CustomButton"

import Colors from "../../constants/Colors"

import * as ImageManipulator from "expo-image-manipulator"
import { uploadImage } from "../../firebase/storage"
import { savePost } from "../../firebase/database/post/savePost"

const { width, height } = Dimensions.get("window")
const FirstScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const [source, setSource] = useState<any>(undefined)

  const pickImageAsync = async () => {
    setSource(undefined)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      navigation.setParams({ image: result.uri })
      setSource({ uri: result.uri })
    }
  }

  const uploadImageHandler = async () => {
    const { uri } = source

    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: width * 0.8 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    )

    const uploadUri =
      Platform.OS === "ios"
        ? manipResult.uri.replace("file://", "")
        : manipResult.uri

    uploadImage(uploadUri)
  }

  return (
    <ScrollView style={styles.screen}>
      {/* FIRST CONTAINER WHICH WILL CONTAIN AN IMAGE PREVIEW */}
      <View style={styles.imagePreviewContainer}>
        {source ? (
          <Image style={styles.imageStyle} source={{ uri: source.uri }} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <CustomButton title={"Choose an image"} onPress={pickImageAsync} />
          </View>
        )}
      </View>
      <View>
        {source && (
          <View style={{ width, justifyContent: "center" }}>
            <CustomButton title={"Change Image"} onPress={pickImageAsync} />
          </View>
        )}
        <Button title={"try upload"} onPress={uploadImageHandler} />
        <Button title={"try post save"} onPress={savePost} />
      </View>
    </ScrollView>
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
