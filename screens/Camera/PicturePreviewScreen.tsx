import { View, StyleSheet, Image } from "react-native"
import { CustomIconButton } from "../../components/IconButton"
import { Video } from "expo-av"
import { useRef } from "react"

import { useAppDispatch } from "../../state/store"
import { postStoryThunk } from "../../state/thunks/stories/postStoryThunk"
import { postStory } from "../../firebase/database/stories/postStory"

import { uploadImage } from "../../firebase/storage"
import { uuidv } from "../../utils/uuidv"

import Colors from "../../constants/Colors"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const PicturePreviewScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const user = useSelector((state: RootState) => state.user)
  const resource = route.params.resource
  const isRecording = route.params.isRecording
  const videoRef = useRef<any>(null)

  const dispatch = useAppDispatch()

  const handleStoryPost = async () => {
    console.log({ resource })
    try {
      const fileLocation = uuidv()
      const mediaUrl = await uploadImage(resource, fileLocation)
      console.log("crashixng?")
      await postStory({
        mediaURL: mediaUrl,
        createdBy: user.uid as string,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * 60 * 24 * 1000,
      })
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.upperButtons}>
        <CustomIconButton
          iconName={"arrow-back"}
          color={"white"}
          size={40}
          onPress={() => navigation.goBack()}
        />

        <CustomIconButton
          iconName={"arrow-back"}
          color={"white"}
          size={35}
          onPress={handleStoryPost}
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
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  upperButtons: {
    flexDirection: "row",
    marginVertical: 40,
    marginHorizontal: 15,
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
})

export default PicturePreviewScreen
