import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useRef, useState } from "react"
import { Camera } from "expo-camera"
import {
  LongPressGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler"

import { CustomIconButton } from "../../components/IconButton"

/* Use camera features */
import { useCameraFeatures } from "../../hooks/useCameraFeatures"

const { width, height } = Dimensions.get("window")
const CameraScreen = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
  const [facesDetected, setFacesDetected] = useState<any>(undefined)
  const cameraRef = useRef<any>(null)
  const recordref = useRef<any>(null)

  const {
    type,
    autoFocus,
    switchType,
    takePicture,
    record,
    stopRecording,
    isFlashModeActive,
    switchFlashMode,
  } = useCameraFeatures(cameraRef, navigation)

  return (
    <Layout>
      <Camera
        style={styles.camera}
        type={type}
        autoFocus={autoFocus}
        ref={cameraRef}
        focusDepth={0}
        flashMode={isFlashModeActive}
        focusable={true}
        //onFacesDetected={handleFacesDetected}
      >
        {facesDetected && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
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
              style={{ marginLeft: 10 }}
            />

            {/* FLASH TOGGLE BUTTON */}
            <CustomIconButton
              iconName={isFlashModeActive == "on" ? "flash" : "flash-off"}
              color={"white"}
              onPress={() => switchFlashMode()}
              size={30}
              style={{ marginRight: 10 }}
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
                onActivated={() => {
                  console.log("clicked")
                  takePicture()
                }}
              >
                <TouchableOpacity style={styles.captureButton} />
              </TapGestureHandler>
            </LongPressGestureHandler>

            <CustomIconButton
              iconName={"ios-camera-reverse-outline"}
              size={45}
              color={"white"}
              onPress={() => switchType()}
            />
          </View>
        </View>
      </Camera>
    </Layout>
  )
}

const Layout: React.FC = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
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
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 40,
  },
  insideOfCameraContent: {
    width: width,
    height: height * 0.95,
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: height * 0.05,
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
