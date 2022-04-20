import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface CustomIconButtonProps {
  iconName: any
  color: string
  onPress: () => void
  size: number
}

export const CustomIconButton: React.FC<CustomIconButtonProps> = (props) => {
  const { color, iconName, onPress, size } = props

  let NativeTouchableComponent: any =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity

  return (
    <NativeTouchableComponent>
      <Ionicons name={iconName} size={size} color={color} onPress={onPress} />
    </NativeTouchableComponent>
  )
}
