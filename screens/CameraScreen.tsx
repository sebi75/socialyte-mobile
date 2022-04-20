import { View, Text, Alert, StyleSheet, Dimensions } from "react-native"
import { useRef, useState, useEffect } from "react"
import { TapGestureHandler } from "react-native-gesture-handler"
import { Camera } from "expo-camera"

import { CustomIconButton } from "../components/IconButton"

const { width, height } = Dimensions.get("window")
const CameraScreen: React.FC = () => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null)
  const [type, setType] = useState<"front" | "back">(Camera.Constants.Type.back)

  const managePermissionsAsync = () => {
    return Camera.requestCameraPermissionsAsync()
  }

  useEffect(() => {
    managePermissionsAsync().then(({ status }) => {
      setHasPermissions(status === "granted")
      if (status !== "granted") {
        Alert.alert("No permission to use camera")
      }
    })
  }, [hasPermissions])

  return (
    <TapGestureHandler
      numberOfTaps={2}
      onActivated={() => setType(type === "front" ? "back" : "front")}
    >
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <CustomIconButton
              iconName={"recording-outline"}
              size={45}
              color={"white"}
              onPress={() => setType(type === "front" ? "back" : "front")}
            />
            <CustomIconButton
              iconName={"ios-camera-reverse-outline"}
              size={45}
              color={"white"}
              onPress={() => setType(type === "front" ? "back" : "front")}
            />
          </View>
        </Camera>
      </View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    justifyContent: "flex-end",
    alignItems: "center",
    height,
    width,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 35,
  },
})

export default CameraScreen
