import { createNativeStackNavigator } from "@react-navigation/native-stack"

/* SCREENS */
import CameraScreen from "../../screens/Camera/CameraScreen"
import PicturePreviewScreen from "../../screens/Camera/PicturePreviewScreen"

const CameraStack = createNativeStackNavigator()

const CameraStackNavigator: React.FC = () => {
  return (
    <CameraStack.Navigator
      initialRouteName="CameraScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* first screen that contains most of configuration and UI of camera */}
      <CameraStack.Screen name={"CameraScreen"} component={CameraScreen} />
      <CameraStack.Screen
        name={"PicturePreviewScreen"}
        component={PicturePreviewScreen}
        options={{
          //animation for smooth transition between screens
          // like the instagram camera preview
          animation: "fade",
        }}
      />
    </CameraStack.Navigator>
  )
}

export default CameraStackNavigator
