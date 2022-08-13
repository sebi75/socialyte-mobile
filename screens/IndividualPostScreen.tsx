import { View, Text, StyleSheet, Platform, Dimensions } from "react-native"

interface IndividualPostScreenProps {
  route: {
    params: {
      uid: string
      username: string
      postDescription: string
      mediaURL: string
      postDate: string
      postId: string
    }
  }
}

const { width, height } = Dimensions.get("window")
const IndividualPostScreen: React.FC = () => {
  return (
    <View>
      <Text>Individual post screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default IndividualPostScreen
