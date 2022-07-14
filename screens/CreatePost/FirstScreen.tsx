import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { CustomButton } from "../../components/CustomButton"

import Colors from "../../constants/Colors"

import { useCreatePostProcess } from "../../hooks/useCreatePostProcess"
import { useSelector } from "react-redux"

const { width, height } = Dimensions.get("window")
const FirstScreen: React.FC = () => {
  const { pickImageAsync, source } = useCreatePostProcess(800, 800)
  const { isLoading } = useSelector((state: any) => state.postData)

  return (
    <ScrollView style={styles.screen}>
      {/* FIRST CONTAINER WHICH WILL CONTAIN AN IMAGE PREVIEW */}
      <TouchableOpacity
        style={styles.imagePreviewContainer}
        onPress={pickImageAsync}
      >
        {isLoading ? (
          <View style={styles.loadingStateStyle}>
            <ActivityIndicator size="large" color={"white"} />
          </View>
        ) : source ? (
          <Image style={styles.imageStyle} source={{ uri: source.uri }} />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomButton title={"Choose an image"} onPress={pickImageAsync} />
          </View>
        )}
      </TouchableOpacity>
      <View>
        {source && (
          <View style={{ width, justifyContent: "center" }}>
            <CustomButton title={"Change Image"} onPress={pickImageAsync} />
          </View>
        )}
        {/*  <Button title={"try upload"} onPress={uploadImageHandler} /> */}
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(255,255,255,0.5)",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  loadingStateStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default FirstScreen
