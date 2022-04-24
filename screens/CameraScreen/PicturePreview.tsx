import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { CustomIconButton } from "../../components/IconButton"
const { width, height } = Dimensions.get("window")
import { Video, AVPlaybackStatus } from "expo-av"
import { useRef } from "react"
import Colors from "../../constants/Colors"

const PicturePreviewScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const resource = route.params.resource
  const isRecording = route.params.isRecording
  const videoRef = useRef<any>(null)
  return (
    <View style={styles.screen}>
      <View style={styles.upperButtons}>
        <CustomIconButton
          iconName={"arrow-back"}
          color={"white"}
          size={40}
          onPress={() => navigation.goBack()}
        />
      </View>
      {isRecording ? (
        <Video
          source={{ uri: resource }}
          style={styles.image}
          resizeMode="contain"
          shouldPlay
          isLooping
          ref={videoRef}
        />
      ) : (
        <Image style={styles.image} source={{ uri: resource }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width,
    height,
    backgroundColor: Colors.dark,
  },
  image: {
    width: width,
    height: height,
    position: "absolute",
  },
  upperButtons: {
    flexDirection: "row",
    marginVertical: 40,
    marginHorizontal: 15,
    zIndex: 1,
  },
})

export default PicturePreviewScreen
