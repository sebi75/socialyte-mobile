import { View, FlatList, StyleSheet } from "react-native"
import FeedPost from "../../components/FeedPost"

import { useEffect } from "react"

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
        data={[
          {
            id: 1,
            first_name: "Thatch",
            last_name: "Pozzo",
            image: require("../../assets/pictures/1.jpg"),
            avatar:
              "https://robohash.org/quodofficiisaut.png?size=50x50&set=set1",
            username: "tpozzo0",
          },
          {
            id: 2,
            first_name: "Burch",
            last_name: "Kleyn",
            image: require("../../assets/pictures/2.jpg"),
            avatar:
              "https://robohash.org/voluptatumminusquas.png?size=50x50&set=set1",
            username: "bkleyn1",
          },
          {
            id: 3,
            first_name: "Marrissa",
            last_name: "Pentercost",
            image: require("../../assets/pictures/3.jpg"),
            avatar:
              "https://robohash.org/accusantiumvoluptatemqui.png?size=50x50&set=set1",
            username: "mpentercost2",
          },
        ]}
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
