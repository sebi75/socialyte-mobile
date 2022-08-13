import { View, FlatList, StyleSheet } from "react-native"
import FeedPost from "../../components/FeedPost"
import { Post } from "../../firebase/types"

import React, { useEffect } from "react"

interface FeedScreenProps {
  posts: Array<Post>
}

const FeedScreen: React.FC<FeedScreenProps> = React.memo(({ posts }) => {
  useEffect(() => {
    console.log("FEED BODY LOADED, MESSAGE FROM USEEFFECT RUN")
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.postId}
        data={posts}
        renderItem={({ item }) => {
          const {
            username,
            mediaURL,
            postDescription,
            postId,
            createdAt,
            postOwner,
          } = item

          return (
            <FeedPost
              username={username}
              postDescription={postDescription}
              mediaURL={mediaURL}
              postId={postId}
              createdAt={createdAt.toLocaleString()}
              postOwner={postOwner}
            />
          )
        }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
  },
})

export default FeedScreen
