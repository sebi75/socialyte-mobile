import { createNativeStackNavigator } from "@react-navigation/native-stack"

/* SCREENS */
import CameraScreen from "../../screens/CameraScreen/CameraScreen"
import PicturePreviewScreen from "../../screens/CameraScreen/PicturePreview"

const CameraStack = createNativeStackNavigator()

const CameraStackNavigator: React.FC = () => {
  return (
    <CameraStack.Navigator
      initialRouteName="CameraScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <CameraStack.Screen name={"CameraScreen"} component={CameraScreen} />
      <CameraStack.Screen
        name={"PicturePreviewScreen"}
        component={PicturePreviewScreen}
      />
    </CameraStack.Navigator>
  )
}

export default CameraStackNavigator
