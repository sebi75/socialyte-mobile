import { View, Text, StyleSheet, Dimensions, Touchable } from "react-native"

import { calculateTimeAgo } from "../../utils/timeAgo"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"

interface CommentComponentProps {
  comment: string
  commentId: string
  createdAt: number
}

const { width } = Dimensions.get("window")
const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  createdAt,
}) => {
  const timeago = calculateTimeAgo(createdAt)
  const navigation: any = useNavigation()
  return (
    <View
      style={styles.screen}
      /* onPress={() => navigation.navigate("ProfileScreen", {

      })} */
    >
      <Text style={styles.textStyle}>{comment}</Text>
      <Text style={styles.textStyle}>{timeago} ago</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    width: width * 0.9,
    height: width * 0.1,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  textStyle: {
    fontSize: 15,
    color: "white",
  },
})

export default CommentComponent
