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
