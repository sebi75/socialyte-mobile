import { View, Text, Alert, StyleSheet } from "react-native"
import { useRef, useState, useEffect } from "react"
import { TapGestureHandler } from "react-native-gesture-handler"
import { Camera } from "expo-camera"

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
        <Camera style={styles.camera} type={type}></Camera>
      </View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
})

export default CameraScreen
