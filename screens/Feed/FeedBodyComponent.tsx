import { View, FlatList, StyleSheet, Text, Dimensions } from "react-native"

import FeedPost from "../../components/FeedPost"
import { CustomButton } from "../../components/CustomButton"

import { Post } from "../../firebase/types"
import Colors from "../../constants/Colors"

import React from "react"
import { useNavigation } from "@react-navigation/native"

interface FeedScreenProps {
  posts: Array<Post>
  uid: string
}

const { width, height } = Dimensions.get("window")
const FeedScreen: React.FC<FeedScreenProps> = React.memo(({ posts, uid }) => {
  const navigation: any = useNavigation()

  return (
    <View style={styles.screen}>
      {posts.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.postId}
          data={posts}
          renderItem={({ item }) => {
            const {
              username,
              mediaURL,
              postDescription,
              profilePicture,
              postId,
              createdAt,
              postOwner,
              likes,
            } = item

            return (
              <FeedPost
                uid={uid}
                username={username}
                postDescription={postDescription}
                profilePicture={profilePicture}
                mediaURL={mediaURL}
                postId={postId}
                createdAt={createdAt.toLocaleString()}
                postOwner={postOwner}
                likes={likes}
              />
            )
          }}
        />
      ) : (
        <View style={styles.noPostsContainer}>
          <Text style={styles.noPostsText}>No content to display</Text>
          <CustomButton
            title="Explore"
            buttonStyle={{
              marginTop: 10,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              borderRadius: 7,
            }}
            textStyle={{
              color: Colors.primary,
              fontSize: 17,
            }}
            onPress={() => navigation.navigate("DiscoverStackNavigator")}
          />
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  noPostsContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  noPostsText: {
    fontSize: 20,
    color: "white",
  },
})

export default FeedScreen
