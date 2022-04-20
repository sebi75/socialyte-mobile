import { View, FlatList, StyleSheet } from "react-native"
import FeedPost from "../components/FeedPost"

import DUMMY from "../data/dummy"
import Colors from "../constants/Colors"

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DUMMY}
        renderItem={({ item }) => {
          const { avatar, username, id, image } = item
          const caption = Math.random().toString(36).substring(7)

          return (
            <FeedPost
              avatarImage={avatar}
              username={username}
              caption={caption}
              imageURL={image}
            />
          )
        }}
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
