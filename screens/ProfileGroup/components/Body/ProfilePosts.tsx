import { SafeAreaView, FlatList, StyleSheet, Dimensions } from "react-native"
import PostPreview from "./PostPreview"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../../../state/store"
import { useEffect } from "react"

const { width, height } = Dimensions.get("window")
const ProfilePosts: React.FC = () => {
  const { posts } = useSelector((state: RootState) => state.userPosts)

  useEffect(() => {
    console.log(posts)
  }, [])

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        numColumns={3}
        data={posts}
        keyExtractor={(item) => item.description}
        renderItem={({ item }) => {
          const { mediaURL, description } = item
          return <PostPreview imageURL={mediaURL} />
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default ProfilePosts
