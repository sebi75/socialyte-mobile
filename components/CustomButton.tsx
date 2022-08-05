import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native"

interface CustomButtonProps {
  onPress: () => void
  title: string
  buttonStyle?: any
  textStyle?: any
}

const { width } = Dimensions.get("window")
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.buttonStyle, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 15,
    width: width * 0.3,
    paddingVertical: 7,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
})
