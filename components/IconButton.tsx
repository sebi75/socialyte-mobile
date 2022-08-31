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
      <Ionicons name={iconName} size={size} color={color} onPress={onPress} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  screen: {
    maxWidth: 50,
    minWidth: 30,
    maxHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
})
