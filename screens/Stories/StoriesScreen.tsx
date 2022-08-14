import { Dimensions, View, StyleSheet, FlatList } from "react-native"
import { useCallback, useEffect } from "react"

import StoriesScreenBody from "./StoriesScreenBody"
import Colors from "../../constants/Colors"

import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../state/store"
import { getStoriesThunk } from "../../state/thunks/stories/getStoriesThunk"

/* 
TODO: Add stories to local state when adding a new one
fix the crash issues when adding a new story
*/

const { width, height } = Dimensions.get("window")
const StoriesScreen: React.FC = () => {
  const {
    stories: storiesData,
    fetchedOnce,
    isLoading,
  } = useSelector((state: RootState) => state.stories)
  const dispatch = useAppDispatch()

  const getBody = useCallback(() => {
    return <StoriesScreenBody stories={storiesData} />
  }, [storiesData])

  useEffect(() => {
    if (storiesData.length == 0 || !fetchedOnce) {
      console.log("Fetching stories data at first mount....")
      dispatch(getStoriesThunk())
    }
  }, [fetchedOnce, storiesData.length])

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={() => dispatch(getStoriesThunk())}
        refreshing={isLoading}
        renderItem={() => null}
        numColumns={2}
        data={null}
        ListHeaderComponent={null}
        ListFooterComponent={getBody}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width,
    height,
    backgroundColor: Colors.dark,
    alignItems: "center",
    paddingHorizontal: 10,
  },
})

export default StoriesScreen

const mockStories = [
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
