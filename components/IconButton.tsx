import { TouchableOpacity, StyleSheet } from "react-native"
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

  return (
    <TouchableOpacity style={[styles.screen, style]} onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  screen: {
    maxWidth: 75,
    width: 35,
    maxHeight: 75,
    justifyContent: "center",
    alignItems: "center",
  },
})
