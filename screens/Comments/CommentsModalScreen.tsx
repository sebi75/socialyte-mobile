import { View, Text, StyleSheet, FlatList } from "react-native"

import Colors from "../../constants/Colors"
import CommentBodyScreen from "./CommentBodyComponent"
import CommentHeaderComponent from "./CommentHeaderComponent"

import { useCallback, useEffect } from "react"

import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../state/store"
import { getCommentsThunk } from "../../state/thunks/posts/getCommentsThunk"

interface CommentModalScreenProps {
  route: {
    params: {
      postId: string
    }
  }
}

const CommentsModalScreen: React.FC<CommentModalScreenProps> = ({ route }) => {
  const user = useSelector((state: RootState) => state.user)
  const { comments, isLoading } = useSelector(
    (state: RootState) => state.postsUtils
  )

  const postId = route.params.postId
  const dispatch = useAppDispatch()

  const getHeader = useCallback(() => {
    return <CommentHeaderComponent postId={postId} uid={user.uid as string} />
  }, [postId])

  const getBody = useCallback(() => {
    return (
      <CommentBodyScreen comments={comments[postId]} isLoading={isLoading} />
    )
  }, [postId, comments, isLoading])

  useEffect(() => {
    if (!comments[postId]) {
      dispatch(getCommentsThunk(postId))
    }
  }, [postId])

  return (
    <View style={styles.screen}>
      <FlatList
        ListHeaderComponent={getHeader}
        ListFooterComponent={getBody}
        data={null}
        renderItem={() => null}
      />
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
