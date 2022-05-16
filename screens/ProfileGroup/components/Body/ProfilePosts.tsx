import { SafeAreaView, FlatList, StyleSheet, Dimensions } from "react-native"
import PostPreview from "./PostPreview"

import dummy from "../../../../data/dummy"

const { width, height } = Dimensions.get("window")
const ProfilePosts: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        numColumns={3}
        data={dummy}
        renderItem={({ item }) => {
          const { avatar, first_name, id, image, last_name, username } = item
          console.log(image)
          return <PostPreview imageURL={image} />
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ProfilePosts
