import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import { CustomIconButton } from "../../components/IconButton"
import { Video } from "expo-av"
import { useRef } from "react"

import { SafeAreaView } from "react-native-safe-area-context"

import { useAppDispatch } from "../../state/store"
import { postStoryThunk } from "../../state/thunks/stories/postStoryThunk"

import { uuidv } from "../../utils/uuidv"

import Colors from "../../constants/Colors"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const { width, height } = Dimensions.get("window")
const PicturePreviewScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const user = useSelector((state: RootState) => state.user)
  const { postLoading } = useSelector((state: RootState) => state.stories)

  const resource = route.params.resource
  const isRecording = route.params.isRecording
  const videoRef = useRef<any>(null)

  const dispatch = useAppDispatch()

  const handleStoryPost = async () => {
    try {
      await dispatch(
        postStoryThunk({
          mediaURL: resource,
          createdBy: user.uid as string,
          storyId: uuidv(),
          expiresAt: Date.now() + 60 * 60 * 24 * 1000,
          username: user.username as string,
          profilePicture: user.profilePicture as string,
          createdAt: Date.now(),
        })
      )
      navigation.goBack()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.upperButtons}>
        <CustomIconButton
          iconName={"arrow-back"}
          color={"white"}
          size={40}
          onPress={() => navigation.goBack()}
        />

        <CustomIconButton
          iconName={"cloud-upload"}
          color={"white"}
          size={25}
          onPress={() => handleStoryPost()}
        />
      </SafeAreaView>
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

      <View style={styles.bottomButtons}>
        {postLoading ? (
          <ActivityIndicator size={"small"} color={Colors.primary} />
        ) : (
          <CustomIconButton
            iconName={"cloud-upload"}
            size={30}
            color={"white"}
            onPress={handleStoryPost}
          />
        )}
      </View>
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
    zIndex: -10,
  },
  upperButtons: {
    flexDirection: "row",
    marginHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },

  bottomButtons: {
    backgroundColor: "red",
    width,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: height * 0.12,
  },
})

export default PicturePreviewScreen
