import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native"

interface CustomButtonProps {
  title: string
  onPress: () => void
  styles?: Object
}

const { width } = Dimensions.get("window")
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.buttonStyle}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    width: width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  buttonText: {
    color: "white",
  },
})
