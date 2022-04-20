import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface CustomHeaderButtonProps {
  iconName: any
  color: string
  onPress: () => void
}

export const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = (
  props
) => {
  const { color, iconName, onPress } = props

  let NativeTouchableComponent: any =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity

  return (
    <NativeTouchableComponent>
      <Ionicons name={iconName} size={25} color={color} onPress={onPress} />
    </NativeTouchableComponent>
  )
}
