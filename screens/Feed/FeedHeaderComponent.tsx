import { View, FlatList, StyleSheet, Text } from "react-native"

import { useEffect } from "react"

import Colors from "../../constants/Colors"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const FeedHeaderComponent: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    console.log("feed screen rendered")
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={[
          {
            id: 1,
            avatar:
              "https://robohash.org/quodofficiisaut.png?size=50x50&set=set1",
            username: "tpozzo0",
          },
          {
            id: 2,
            avatar:
              "https://robohash.org/voluptatumminusquas.png?size=50x50&set=set1",
            username: "bkleyn1",
          },
          {
            id: 3,
            avatar:
              "https://robohash.org/accusantiumvoluptatemqui.png?size=50x50&set=set1",
            username: "mpentercost2",
          },
        ]}
        renderItem={({ item }) => {
          const { avatar, username, id } = item
          const caption = Math.random().toString(36).substring(7)

          return <Text style={{ color: "white" }}>a</Text>
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: 70,
    backgroundColor: "red",
    alignItems: "center",
  },
})

export default FeedHeaderComponent
