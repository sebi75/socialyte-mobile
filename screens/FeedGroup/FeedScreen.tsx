import { View, FlatList, StyleSheet } from "react-native"
import FeedPost from "../../components/FeedPost"

import { useEffect } from "react"

import DUMMY from "../../data/dummy"
import Colors from "../../constants/Colors"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const FeedScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  console.log("current user: ", user)

  useEffect(() => {
    console.log("feed screen rendered")
  }, [])

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
