import { View, FlatList, StyleSheet } from "react-native"

import { useEffect } from "react"

import Colors from "../../constants/Colors"

import FeedBodyComponent from "./FeedBodyComponent"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { getUserFeedThunk } from "../../state/thunks/feed/getUserFeedThunk"
import { getUserConnectionsIdsThunk } from "../../state/thunks/user-connections/getUserConnectionIdsThunk"
import { useAppDispatch } from "../../state/store"

const FeedScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const userConnections = useSelector(
    (state: RootState) => state.userConnections
  )
  const { posts, fetchedAtFirstMount, isLoading } = useSelector(
    (state: RootState) => state.userFeed
  )

  const dispatch = useAppDispatch()

  const getFeedBody = () => {
    return <FeedBodyComponent posts={posts} uid={user.uid as string} />
  }

  useEffect(() => {
    console.log("Running effect")
    if (!userConnections.fetchedAtStartup && user.isAuthenticated) {
      console.log("fetching user-connections ids in FeedScreen...")
      dispatch(getUserConnectionsIdsThunk(user.uid as string))
    }
  }, [user.uid, userConnections.fetchedAtStartup])

  useEffect(() => {
    if (posts == [] || fetchedAtFirstMount == false) {
      console.log("fetching user-feed in FeedScreen...")
      dispatch(getUserFeedThunk(user.uid as string))
    }
  }, [posts, fetchedAtFirstMount, user.uid])

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => {
          dispatch(getUserFeedThunk(user.uid as string))
        }}
        refreshing={isLoading}
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
