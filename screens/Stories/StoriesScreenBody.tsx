import { FlatList, View, StyleSheet, Dimensions, Text } from "react-native"

import React from "react"
import StoryThumbnail from "./stories/StoryThumbnail"
import { Story } from "../../firebase/types"

interface StoriesScreenBodyProps {
  stories: Story[]
}

const { width, height } = Dimensions.get("window")
const StoriesScreenBody: React.FC<StoriesScreenBodyProps> = React.memo(
  ({ stories }) => {
    console.log({ storiesLength: stories.length })
    return (
      <View style={styles.screen}>
        {stories.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={stories}
            numColumns={2}
            keyExtractor={(item) => item.storyId}
            renderItem={({ item }) => {
              return <StoryThumbnail {...item} />
            }}
          />
        ) : (
          <View style={styles.noStoriesContainer}>
            <Text style={styles.noStoriesText}>
              There are no stories at the moment. Check later!
            </Text>
          </View>
        )}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  screen: {
    maxWidth: "100%",
    width,
    height,
  },
  noStoriesContainer: {
    marginTop: 20,
    width: width * 0.7,
    height,
    alignItems: "center",
  },
  noStoriesText: {
    fontSize: 20,
    color: "white",
  },
})

export default StoriesScreenBody
