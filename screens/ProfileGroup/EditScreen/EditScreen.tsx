import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const EditScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>EditScreen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "green",
  },
})

export default EditScreen
