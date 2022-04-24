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
  const [facesDetected, setFacesDetected] = useState<any>(undefined)
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
    const options = {
      maxDuration: 7,
      mute: false,
    }
    const record = await cameraRef.current.recordAsync(options)

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
          "No permission",
          "Please grant permission if you want to access the camera",
          [
            {
              text: "Okay",
              onPress: () => {
                navigation.goBack()
              },
              style: "cancel",
            },
          ]
        )
      }
    })
  }, [hasPermissions])

  const handleFacesDeteced = (faces: any) => {
    if (faces.faces.length > 0) {
      setFacesDetected({
        origin: faces.faces[0].bounds.origin,
        size: faces.faces[0].bounds.size,
      })
    } else {
      setFacesDetected(undefined)
    }
  }

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
          focusDepth={0}
          onFacesDetected={handleFacesDeteced}
        >
          {facesDetected && (
            <View
              style={{
                borderWidth: 1,
                borderColor: "yellow",
                width: facesDetected.size.width,
                height: facesDetected.size.height,
                position: "absolute",
                top: facesDetected.origin.y,
                left: facesDetected.origin.x,
              }}
            ></View>
          )}
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
