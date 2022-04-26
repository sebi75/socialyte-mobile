import { useState, useEffect } from "react"
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator"
import { Camera } from "expo-camera"
import { Alert } from "react-native"

export const useCameraFeatures = (cameraRef: any, navigation: any) => {
  const [type, setCameraType] = useState<"front" | "back">("back")
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null)
  const autoFocus = Camera.Constants.AutoFocus.on

  console.log("camera features hook called")

  const managePermissionsAsync = () => {
    return Camera.requestCameraPermissionsAsync()
  }

  const recordOptions = {
    maxDuration: 7,
    mute: false,
  }

  const switchType = () => {
    return type == "front" ? setCameraType("back") : setCameraType("front")
  }

  const takePicture = async () => {
    if (!cameraRef) return

    let photo = await cameraRef.current.takePictureAsync()

    if (type == "front") {
      cameraRef.current.pausePreview()

      photo = await manipulateAsync(
        photo.localUri || photo.uri,
        [{ rotate: 180 }, { flip: FlipType.Vertical }],
        { compress: 1, format: SaveFormat.PNG }
      )

      navigation.navigate("PicturePreviewScreen", {
        resource: photo.uri,
        isRecording: false,
      })
    } else {
      navigation.navigate("PicturePreviewScreen", {
        resource: photo.uri,
        isRecording: false,
      })
    }
  }
  const record = async () => {
    const record = await cameraRef.current.recordAsync(recordOptions)

    if (record.uri) {
      navigation.navigate("PicturePreviewScreen", {
        resource: record.uri,
        isRecording: true,
      })
    }
  }

  const stopRecording = async () => {
    const stop = await cameraRef.current.stopRecording()
  }

  useEffect(() => {
    managePermissionsAsync().then(({ status }) => {
      setHasPermissions(status === "granted")
      if (status !== "granted") {
        Alert.alert(
          "Camera permissions",
          "Please grant camera permissions to use this feature",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => navigation.goBack(),
            },
          ]
        )
      }
    })
  }, [hasPermissions])

  return {
    hasPermissions,
    type,
    autoFocus,
    switchType,
    recordOptions,
    takePicture,
    record,
    stopRecording,
  }
}
