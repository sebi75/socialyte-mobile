import {
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from "react-native"

interface CustomButtonProps {
  title: string
  onPress: () => void
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
}) => {
  const NativeTouchableOpacity: any =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity
  return (
    <NativeTouchableOpacity
      activeOpacity={0.8}
      style={styles.buttonStyle}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </NativeTouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 13,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  buttonText: {
    color: "white",
  },
})
