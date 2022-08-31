import { View, StyleSheet, Dimensions, FlatList } from "react-native"
import { useEffect, useCallback } from "react"

import Colors from "../../constants/Colors"
import LikesBodyComponent from "./LikesBodyComponent"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../state/store"
import { getLikesPreviewsThunk } from "../../state/thunks/posts/getLikesPreviewsThunk"

interface LikesModalScreenProps {
  route: {
    params: {
      postId: string
    }
  }
}

const { width, height } = Dimensions.get("window")
const LikesModalScreen: React.FC<LikesModalScreenProps> = ({ route }) => {
  const postId = route.params.postId
  const dispatch = useAppDispatch()
  const { likesPreviews, isLikesPreviewsLoading } = useSelector(
    (state: RootState) => state.postsUtils
  )

  const getBody = useCallback(() => {
    return (
      <LikesBodyComponent
        likesPreviews={likesPreviews[postId]}
        isLoading={isLikesPreviewsLoading}
      />
    )
  }, [postId, likesPreviews])

  console.log({ likesPreviews })

  useEffect(() => {
    if (likesPreviews[postId] === undefined) {
      dispatch(getLikesPreviewsThunk(postId))
    }
  }, [postId])

  return (
    <View style={styles.screen}>
      <FlatList
        renderItem={() => null}
        data={null}
        refreshing={isLikesPreviewsLoading}
        onRefresh={() => dispatch(getLikesPreviewsThunk(postId))}
        ListFooterComponent={getBody}
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

export default LikesModalScreen
