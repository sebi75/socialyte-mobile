import { Platform } from "react-native"
import { useState } from "react"
import { useAppDispatch } from "../state/store"

import * as ImageManipulator from "expo-image-manipulator"
import { uploadImage, getImageUrl } from "../firebase/storage"
import * as ImagePicker from "expo-image-picker"
import {
  setImageUri,
  clearImageUri,
  setIsLoading,
} from "../state/action-creators/createPostActions"

export const useCreatePostLogic = (width: any, height: any) => {
  const [source, setSource] = useState<any>(undefined)
  const dispatch = useAppDispatch()

  const pickImageAsync = async () => {
    dispatch(clearImageUri())
    dispatch(setIsLoading(true))
    setSource(undefined)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setSource({ uri: result.uri })
      dispatch(setIsLoading(false))

      try {
        const compressedImage = await compressImage(result.uri)
        console.log("got here and compressed image: ", compressedImage)
        dispatch(setImageUri(compressedImage))
      } catch (error) {
        console.log("error in compressing the image")
        console.log("error: ", error)
      }
    } else {
      dispatch(setIsLoading(false))
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

  return { pickImageAsync, source, setSource }
}
