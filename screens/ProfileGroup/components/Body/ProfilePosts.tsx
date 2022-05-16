import { SafeAreaView, FlatList, StyleSheet, Dimensions } from "react-native"
import PostPreview from "./PostPreview"

import dummy from "../../../../data/dummy"

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
        renderItem={({ item }) => {
          const { mediaReference, description } = item
          return <PostPreview key={description} imageURL={mediaReference} />
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
