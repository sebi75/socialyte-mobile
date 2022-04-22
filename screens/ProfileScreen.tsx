import { View, Text, StyleSheet, Dimensions } from "react-native"

import Colors from "../constants/Colors"

const { width, height } = Dimensions.get("window")
const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width,
    height,
    backgroundColor: Colors.dark,
  },
})

export default ProfileScreen
