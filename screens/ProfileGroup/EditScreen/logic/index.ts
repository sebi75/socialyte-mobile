import { updateUserProfileThunk } from "../../../../state/thunks/user/updateUserProfileThunk"
import { setGlobalAlertData } from "../../../../state/reducers/globalAlertReducer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setIsLoading } from "../../../../state/reducers/createPostReducer"
import * as ImagePicker from "expo-image-picker"
import * as ImageManipulator from "expo-image-manipulator"
import { Platform, Alert } from "react-native"
import {
  setImageUri,
  setUsername,
  setDescription,
} from "../../../../state/reducers/editProfileReducer"

export const updateProfile = async (
  dispatch: any,
  editProfileData: any,
  user: any
) => {
  const updatedFields = {
    username: editProfileData.username,
    description: editProfileData.description,
    profilePicture: editProfileData.photoURL,
  }
  const response: any = await dispatch(
    updateUserProfileThunk({ uid: user.uid as string, updatedFields })
  )
  //update the profile in the async storage
  const responseData = response.payload
  try {
    await AsyncStorage.mergeItem(
      user.uid as string,
      JSON.stringify({
        uid: user.uid as string,
        email: user.email as string,
        username: editProfileData.username,
        description: editProfileData.description,
        profilePicture: responseData.profilePicture,
      })
    )
    dispatch(
      setGlobalAlertData({
        isVisible: true,
        title: "Success",
        subtitle: "Profile updated successfully",
      })
    )
  } catch (error) {
    console.log(error)
    throw new Error("Error updating the profile")
  }
}

export const pickImageAsync = async (dispatch: any) => {
  dispatch(setImageUri(""))
  dispatch(setIsLoading(true))
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (permissionResult.granted === false) {
    Alert.alert("Error", "Please allow access to media library in settings.", [
      { text: "OK" },
    ])
  }
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  })

  if (!result.cancelled) {
    try {
      const compressedImage = await compressImage(result.uri)
      dispatch(setImageUri(compressedImage))
      dispatch(setIsLoading(false))
    } catch (error) {
      console.log("error in compressing the image")
      console.log("error: ", error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  return
}

const compressImage = async (uri: string) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800, height: 800 } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  )

  const uploadUri =
    Platform.OS === "ios"
      ? manipResult.uri.replace("file://", "")
      : manipResult.uri

  return uploadUri
}
