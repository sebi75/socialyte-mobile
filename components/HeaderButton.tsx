import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface CustomHeaderButtonProps {
  iconName: any
  onPress: () => void
}

export const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = ({
  iconName,
  onPress,
}) => {
  let NativeTouchableComponent: any =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity

  return (
    <NativeTouchableComponent>
      <Ionicons name={iconName} size={25} color="#fcba03" onPress={onPress} />
    </NativeTouchableComponent>
  )
}
