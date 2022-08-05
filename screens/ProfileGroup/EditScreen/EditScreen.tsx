import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native"
import React, { useEffect, useCallback } from "react"
import { Avatar } from "react-native-paper"

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

import { updateProfile, pickImageAsync } from "./logic/index"

const { width } = Dimensions.get("window")
const EditScreen: React.FC = () => {
  const editProfileData = useSelector((state: RootState) => state.editProfile)
  const user = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()
  const setUsernameText = useCallback((text: string) => {
    dispatch(setUsername(text))
  }, [])
  const setDescriptionText = useCallback((text: string) => {
    dispatch(setDescription(text))
  }, [])

  const updateProfileHandler = useCallback(async () => {
    try {
      updateProfile(dispatch, editProfileData, user)
    } catch (error) {
      console.log(error)
      throw Error("Error updating the profile")
    }
  }, [dispatch, editProfileData, user])

  const pickImageHandler = useCallback(async () => {
    await pickImageAsync(dispatch)
  }, [])

  useEffect(() => {
    dispatch(setUsername(user.username))
    dispatch(setDescription(user.description))
    dispatch(setImageUri(user.profilePicture))
  }, [])

  return (
    <HideKeyboard>
      <View style={containers.screen}>
        {user.isUpdatingLoading ? (
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
                  onPress={pickImageHandler}
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
              onPress={updateProfileHandler}
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

export default EditScreen
