import { View, FlatList, StyleSheet } from "react-native"

import { useEffect } from "react"

import Colors from "../../constants/Colors"

import FeedBodyComponent from "./FeedBodyComponent"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { getUserFeedThunk } from "../../state/thunks/feed/getUserFeedThunk"
import { useAppDispatch } from "../../state/store"

const FeedScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const { posts, fetchedAtFirstMount } = useSelector(
    (state: RootState) => state.userFeed
  )
  const dispatch = useAppDispatch()

  const getFeedBody = () => {
    return <FeedBodyComponent />
  }

  useEffect(() => {
    if (posts == [] || fetchedAtFirstMount == false) {
      console.log("Fetching user feed.....")
      dispatch(getUserFeedThunk(user.uid as string))
    }
  }, [posts, fetchedAtFirstMount])

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={() => null}
        ListHeaderComponent={null}
        ListFooterComponent={getFeedBody}
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

export default FeedScreen
