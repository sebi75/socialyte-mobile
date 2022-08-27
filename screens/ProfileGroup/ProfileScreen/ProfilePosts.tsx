import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native"
import PostPreview from "../../../components/PostPreview"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../../state/store"

interface ProfilePostsProps {
  uid: string
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ uid }) => {
  const { isLoading, users } = useSelector(
    (state: RootState) => state.userPosts
  )
  const posts = users[uid as string]

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"small"} style={{ marginTop: 25 }} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        numColumns={3}
        data={posts}
        keyExtractor={(item) => item.postId}
        renderItem={({ item }) => {
          const {
            mediaURL,
            postDescription,
            createdAt,
            username,
            postId,
            postOwner,
            profilePicture,
            likes,
          } = item
          return (
            <PostPreview
              profilePicture={profilePicture}
              mediaURL={mediaURL}
              postDescription={postDescription}
              createdAt={createdAt}
              username={username}
              postId={postId}
              postOwner={postOwner}
              likes={likes}
            />
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ProfilePosts
