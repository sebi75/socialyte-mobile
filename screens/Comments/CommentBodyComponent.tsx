import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native"
import { Comment } from "../../firebase/types"
import React from "react"

import CommentComponent from "./CommentComponent"
import Colors from "../../constants/Colors"

interface CommentBodyScreenProps {
  comments: Comment[]
  isLoading: boolean
}

const { width, height } = Dimensions.get("window")
const CommentBodyComponent: React.FC<CommentBodyScreenProps> = React.memo(
  ({ comments, isLoading }) => {
    if (isLoading) {
      return (
        <View style={styles.screen}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )
    }

    return (
      <View style={styles.screen}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.commentId}
          renderItem={({ item }) => (
            <CommentComponent
              comment={item.comment}
              commentId={item.commentId}
              createdAt={item.createdAt}
            />
          )}
        />
      </View>
    )
  }
)

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: height,
    maxHeight: "auto",
    alignItems: "center",
  },
})

export default CommentBodyComponent
