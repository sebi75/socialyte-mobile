import {
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native"
import { useRef, useState, useEffect } from "react"
import { Camera } from "expo-camera"
import {
  LongPressGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler"

import { CustomIconButton } from "../../components/IconButton"

const { width, height } = Dimensions.get("window")
const CameraScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null)
  const [recordingUri, setRecordingUri] = useState<string | undefined>(
    undefined
  )
  const [type, setType] = useState<"front" | "back">(Camera.Constants.Type.back)
  const autoFocus = Camera.Constants.AutoFocus.on
  const cameraRef = useRef<any>(null)
  const recordref = useRef<any>(null)

  const managePermissionsAsync = () => {
    return Camera.requestCameraPermissionsAsync()
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      console.log(photo)
      navigation.navigate("PicturePreviewScreen", {
        resource: photo.uri,
        isRecording: false,
      })
    }
  }
  const record = async () => {
    const record = await cameraRef.current.recordAsync()
    setRecordingUri(record)
  }
  const stopRecording = async () => {
    const stop = await cameraRef.current.stopRecording()
    setTimeout(() => {
      navigation.navigate("PicturePreviewScreen", {
        resource: recordingUri,
        isRecording: true,
      })
      console.log(recordingUri)
    }, 500)
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
        <Camera
          style={styles.camera}
          type={type}
          autoFocus={autoFocus}
          ref={cameraRef}
        >
          <View style={styles.insideOfCameraContent}>
            {/* TOP BUTTONS */}
            <View style={styles.topButtons}>
              <CustomIconButton
                iconName={"exit"}
                color={"white"}
                onPress={() => navigation.goBack()}
                size={35}
              />
            </View>
            {/* BOTTOM BUTTONS */}
            <View style={styles.bottomButtons}>
              <LongPressGestureHandler
                onEnded={() => {
                  stopRecording()
                }}
                onActivated={() => {
                  record()
                }}
                ref={recordref}
                minDurationMs={500}
              >
                <TapGestureHandler
                  waitFor={recordref}
                  onActivated={takePicture}
                >
                  <TouchableOpacity style={styles.captureButton} />
                </TapGestureHandler>
              </LongPressGestureHandler>

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
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  container: {
    width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    height: "100%",
    width,
  },
  bottomButtons: {
    backgroundColor: "transparent",
    width,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: height * 0.12,
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
    marginHorizontal: 15,
  },
})

export default CameraScreen
