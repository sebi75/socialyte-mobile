import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
  Alert,
} from "react-native"
import React, { useEffect } from "react"
import { Avatar } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage"

import * as ImagePicker from "expo-image-picker"
import * as ImageManipulator from "expo-image-manipulator"

import Colors from "../../../constants/Colors"
import CustomButton from "../../Authentication/components/CustomButton"
import HideKeyboard from "../../../components/HideKeyboard"

/* REDUX */
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../state/store"
import { RootState } from "../../../state/store"
import {
  setImageUri,
  setUsername,
  setDescription,
} from "../../../state/reducers/editProfileReducer"
import { useCallback } from "react"
import { setIsLoading } from "../../../state/reducers/createPostReducer"
import { updateUserProfileThunk } from "../../../state/thunks/user/updateUserProfileThunk"
import { setGlobalAlertData } from "../../../state/reducers/globalAlertReducer"

const { width, height } = Dimensions.get("window")
const EditScreen: React.FC = () => {
  const editProfileData = useSelector((state: RootState) => state.editProfile)
  const user = useSelector((state: RootState) => state.user)
  const isLoading = useSelector(
    (state: RootState) => state.user.isUpdatingLoading
  )
  const dispatch = useAppDispatch()
  const setUsernameText = useCallback((text: string) => {
    dispatch(setUsername(text))
  }, [])
  const setDescriptionText = useCallback((text: string) => {
    dispatch(setDescription(text))
  }, [])

  const updateProfile = useCallback(async () => {
    const updatedFields = {
      username: editProfileData.username,
      description: editProfileData.description,
      profilePicture: editProfileData.photoURL,
    }
    dispatch(updateUserProfileThunk({ uid: user.uid as string, updatedFields }))
    //update the profile in the async storage
    try {
      await AsyncStorage.mergeItem(
        user.uid as string,
        JSON.stringify({
          uid: user.uid as string,
          email: user.email as string,
          username: editProfileData.username,
          description: editProfileData.description,
          profilePicture: editProfileData.photoURL,
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
      throw new Error("Error updating the profile")
    }
  }, [editProfileData, user.uid])

  const pickImageAsync = async () => {
    dispatch(setImageUri(""))
    dispatch(setIsLoading(true))
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      Alert.alert(
        "Error",
        "Please allow access to media library in settings.",
        [{ text: "OK" }]
      )
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
  }

  useEffect(() => {
    console.log(user)
    dispatch(setUsername(user.username))
    dispatch(setDescription(user.description))
    dispatch(setImageUri(user.profilePicture))
  }, [])

  return (
    <HideKeyboard>
      <View style={containers.screen}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={containers.layoutContainer}>
            {/* FIRST LINE CONTAINER */}
            <View style={containers.firstLineContainer}>
              {/* CHANGING THE PROFILE PICTURE CONTAINER */}
              <View style={containers.changePictureContainer}>
                {editProfileData.photoURL ? (
                  <Avatar.Image
                    size={width * 0.15}
                    source={{ uri: editProfileData.photoURL }}
                  />
                ) : (
                  <View style={styles.avatar} />
                )}
                <CustomButton
                  title={"Change"}
                  onPress={pickImageAsync}
                  buttonStyle={{ width: 100, height: 35, marginTop: 15 }}
                />
              </View>

              {/* CHANGE THE DISPLAY NAME CONTAINER */}
              <View style={containers.changeDisplayNameContainer}>
                {/* Input label */}
                <Text style={styles.label}>Username:</Text>
                <TextInput
                  onChangeText={setUsernameText}
                  style={styles.input}
                  value={editProfileData.username}
                  placeholder={"type your display name..."}
                  placeholderTextColor={"rgba(255,255,255,0.5)"}
                />
              </View>
            </View>

            {/* SECOND LINE CONTAINER */}
            <View style={containers.secondLineContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                onChangeText={setDescriptionText}
                value={editProfileData.description}
                style={[
                  styles.input,
                  {
                    height: 75,
                    textAlignVertical: "top",
                  },
                ]}
                numberOfLines={5}
                placeholder={
                  "eg: I am a software developer based in Cluj-Napoca, Romania"
                }
                placeholderTextColor={"rgba(255,255,255,0.5)"}
                maxLength={200}
                multiline={true}
              />
            </View>
            <CustomButton
              title={"Update Profile"}
              buttonStyle={{ marginTop: 50 }}
              onPress={updateProfile}
            />
          </View>
        )}
      </View>
    </HideKeyboard>
  )
}
const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 72,
    height: 72,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    marginTop: 10,
    borderRadius: 7,
    width: "100%",
    height: 40,
    color: "#fff",
  },

  label: {
    fontWeight: "bold",
    marginVertical: 5,
    color: "rgba(255,255,255,0.85)",
  },
})

const containers = StyleSheet.create({
  screen: {
    width,
    alignItems: "center",
    backgroundColor: Colors.dark,
  },
  layoutContainer: {
    width: width * 0.9,
    height: "100%",
    marginTop: 25,
  },
  firstLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondLineContainer: {
    width: width * 0.9,
    marginTop: 25,
  },
  changePictureContainer: {
    width: width * 0.3,
    alignItems: "center",
  },
  changeDisplayNameContainer: {
    width: width * 0.5,
  },
})

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

export default EditScreen
