import { View, Text, Alert, StyleSheet, Dimensions } from "react-native"
import { useRef, useState, useEffect } from "react"
import { TapGestureHandler } from "react-native-gesture-handler"
import { Camera } from "expo-camera"

import { CustomIconButton } from "../components/IconButton"
import { NavigationContainer } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")
const CameraScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
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
          <View style={styles.insideOfCameraContent}>
            {/* TOP BUTTONS */}
            <View style={styles.topButtons}>
              <CustomIconButton
                iconName={"exit"}
                color={"white"}
                onPress={() => navigation.goBack()}
                size={45}
              />
            </View>
            {/* BOTTOM BUTTONS */}
            <View style={styles.bottomButtons}>
              <View style={styles.captureButton} />
              <CustomIconButton
                iconName={"ios-camera-reverse-outline"}
                size={45}
                color={"white"}
                onPress={() => setType(type === "front" ? "back" : "front")}
              />
            </View>
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
    height,
    width,
  },
  bottomButtons: {
    backgroundColor: "transparent",
    width,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: height * 0.1,
  },
  topButtons: {
    backgroundColor: "transparent",
    flexDirection: "row",
    marginVertical: 40,
    marginHorizontal: 15,
    alignSelf: "flex-start",
  },
  insideOfCameraContent: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "space-between",
  },
  captureButton: {
    backgroundColor: "transparent",
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.2,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
})

export default CameraScreen
