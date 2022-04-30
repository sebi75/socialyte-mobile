import { TouchableOpacity, StyleSheet, Text } from "react-native"
import Colors from "../../../../constants/Colors"

interface FollowButtonProps {
  onPress: () => void
  title: string
  buttonStyle?: any
  textStyle?: any
}

const FollowButton: React.FC<FollowButtonProps> = ({
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
    backgroundColor: "#1a68d6",
    marginHorizontal: 5,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  followButtonText: {
    color: "white",
  },
})

export default FollowButton
