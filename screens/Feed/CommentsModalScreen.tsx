import { View, Text, StyleSheet } from "react-native"
import Colors from "../../constants/Colors"

const CommentsModalScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>commeents</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: "center",
  },
})

export default CommentsModalScreen
