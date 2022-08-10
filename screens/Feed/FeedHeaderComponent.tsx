import { View, FlatList, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect } from "react"

import StoryThumbnail from "./stories/StoryThumbnail"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const FeedHeaderComponent: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  //const stories = useSelector((state: RootState) => state.stories)

  const stories = [
    {
      storyId: "1",
      profilePicture:
        "https://robohash.org/quodofficiisaut.png?size=50x50&set=set1",
      username: "tpozzo0",
      mediaURL: require("../../assets/stories/2.jpg"),
    },
    {
      storyId: "2",
      profilePicture:
        "https://robohash.org/voluptatumminusquas.png?size=50x50&set=set1",
      username: "bkleyn1",
      mediaURL: require("../../assets/stories/7.jpg"),
    },
    {
      storyId: "3",
      profilePicture:
        "https://robohash.org/accusantiumvoluptatemqui.png?size=50x50&set=set1",
      username: "mpentercost2",
      mediaURL: require("../../assets/stories/4.jpg"),
    },
  ]

  useEffect(() => {
    console.log("stories component rendered")
  }, [])

  return (
    <View style={styles.screen}>
      {/* <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.storyId}
        horizontal={true}
        data={stories}
        renderItem={({ item }) => {
          console.log(item)
          //const { storyId, username, mediaURL, profilePicture } = item
          return <StoryThumbnail {...item} />
        }}
      /> */}
      {stories.map((story) => {
        return <StoryThumbnail key={story.storyId} {...story} />
      })}
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
