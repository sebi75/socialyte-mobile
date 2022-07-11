import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native"
import { useEffect } from "react"
import Colors from "../../../constants/Colors"
import { useNavigation } from "@react-navigation/native"

interface PostScreenProps {
  image: string
}

const { width, height } = Dimensions.get("window")
const PostScreen: React.FC = () => {
  const navigation: any = useNavigation()

  return <ScrollView style={styles.screen}></ScrollView>
}

const styles = StyleSheet.create({
  screen: {
    width: width,
    height: height,
    backgroundColor: Colors.dark,
  },
})

export default PostScreen
