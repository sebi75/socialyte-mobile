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
import { uploadImage, getImageUrl } from "../../firebase/storage"
import { savePost } from "../../firebase/database/post/savePost"
import { useAppDispatch } from "../../state/store"
import { setImageUri, clearImageUri } from "../../state/action-creators"

const { width, height } = Dimensions.get("window")
const FirstScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const [source, setSource] = useState<any>(undefined)
  const dispatch = useAppDispatch()

  const pickImageAsync = async () => {
    setSource(undefined)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setSource({ uri: result.uri })

      try {
        const compressedImage = await compressImage(result.uri)
        console.log("got here and compressed image: ", compressedImage)
        dispatch(setImageUri(compressedImage))
      } catch (error) {
        console.log("error in compressing the image")
        console.log("error: ", error)
      }
    }
  }

  const compressImage = async (uri: string) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: width, height: width } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    )

    const uploadUri =
      Platform.OS === "ios"
        ? manipResult.uri.replace("file://", "")
        : manipResult.uri

    return uploadUri
  }

  /*   const getUrlTest = async () => {
    const url = await getImageUrl()
    console.log(url)
  } */

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
        {/*  <Button title={"try upload"} onPress={uploadImageHandler} /> */}
        <Button title={"try post save"} onPress={savePost} />
        <Button
          title={"clear image"}
          onPress={() => {
            setSource(undefined)
            dispatch(clearImageUri())
          }}
        />
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
