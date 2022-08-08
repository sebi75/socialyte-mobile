import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface CustomIconButtonProps {
  iconName: any
  color: string
  onPress: () => void
  size: number
  style?: any
}

export const CustomIconButton: React.FC<CustomIconButtonProps> = (props) => {
  const { color, iconName, onPress, size, style } = props

  let NativeTouchableComponent: any =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity

  return (
    <NativeTouchableComponent style={styles.screen}>
      <Ionicons name={iconName} size={size} color={color} onPress={onPress} />
    </NativeTouchableComponent>
  )
}

const styles = StyleSheet.create({
  screen: {
    maxWidth: 50,
    maxHeight: 50,
    justifyContent: "center",
    alignItems: "center",
  },
})
