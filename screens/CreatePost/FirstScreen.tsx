import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native"
import { CustomButton } from "../../components/CustomButton"

import Colors from "../../constants/Colors"

import { useCreatePostLogic } from "../../hooks/useCreatePostLogic"

const { width, height } = Dimensions.get("window")
const FirstScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const { pickImageAsync, source, setSource } = useCreatePostLogic(
    width,
    height
  )

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
