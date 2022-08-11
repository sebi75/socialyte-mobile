import { TouchableOpacity, StyleSheet, Text } from "react-native"
import Colors from "../../../constants/Colors"

interface CustomButtonProps {
  onPress: () => void
  title: string
  buttonStyle?: any
  textStyle?: any
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.followButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
})

export default CustomButton
