import { View, Text, Dimensions, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

interface ErrorComponentProps {
  errorMessage: string
  containerStyles?: any
  textStyles?: any
}

const { width } = Dimensions.get("window")
const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorMessage,
  containerStyles,
  textStyles,
}) => {
  return (
    <View style={[containerStyles, styles.container]}>
      <Ionicons name="warning" size={24} color={"white"} />
      <Text
        style={[
          {
            color: "white",
            fontSize: 14,
          },
          textStyles,
        ]}
      >
        {errorMessage}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: width * 0.7,
    height: 35,
    backgroundColor: Colors.errorColor,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
})

export default ErrorComponent
