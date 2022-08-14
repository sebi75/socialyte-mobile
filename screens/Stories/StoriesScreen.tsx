import { Text, View, StyleSheet, FlatList } from "react-native"
import { useEffect } from "react"

import StoryThumbnail from "./stories/StoryThumbnail"

import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../state/store"
import { getStoriesThunk } from "../../state/thunks/stories/getStoriesThunk"

const StoriesScreen: React.FC = () => {
  const { stories: storiesData, fetchedOnce } = useSelector(
    (state: RootState) => state.stories
  )
  const dispatch = useAppDispatch()

  const stories = [
    {
      mediaURL:
        "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80",
      storyId: "1",
      username: "John Doe",
      profilePicture:
        "https://robohash.org/quodofficiisaut.png?size=50x50&set=set1",
    },
    {
      profilePicture:
        "https://robohash.org/voluptatumminusquas.png?size=50x50&set=set1",
      storyId: "2",
      username: "Jane Doe",
      mediaURL:
        "https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWx8ZW58MHx8MHx8&w=1000&q=80",
    },
    {
      mediaURL:
        "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80",
      storyId: "3",
      username: "John Doe",
      profilePicture:
        "https://robohash.org/quodofficiisaut.png?size=50x50&set=set1",
    },
    {
      profilePicture:
        "https://robohash.org/voluptatumminusquas.png?size=50x50&set=set1",
      storyId: "4",
      username: "Jane Doe",
      mediaURL:
        "https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWx8ZW58MHx8MHx8&w=1000&q=80",
    },
    {
      mediaURL:
        "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80",
      storyId: "5",
      username: "John Doe",
      profilePicture:
        "https://robohash.org/quodofficiisaut.png?size=50x50&set=set1",
    },
  ]

  useEffect(() => {
    console.log({ storiesData })
    if (storiesData.length == 0 || !fetchedOnce) {
      console.log("Fetching stories data at first mount....")
      dispatch(getStoriesThunk())
    }
  }, [])

  const displayData = storiesData ? storiesData : stories

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={displayData}
        keyExtractor={(item) => item.storyId}
        renderItem={({ item }) => {
          return <StoryThumbnail {...item} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingHorizontal: 10,
  },
})

export default StoriesScreen
