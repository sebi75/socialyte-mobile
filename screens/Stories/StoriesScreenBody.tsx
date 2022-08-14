import { FlatList, View, StyleSheet, Dimensions } from "react-native"

import React from "react"
import StoryThumbnail from "./stories/StoryThumbnail"
import { Story } from "../../firebase/types"

interface StoriesScreenBodyProps {
  stories: Story[]
}

const { width, height } = Dimensions.get("window")
const StoriesScreenBody: React.FC<StoriesScreenBodyProps> = React.memo(
  ({ stories }) => {
    return (
      <View style={styles.screen}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={stories}
          numColumns={2}
          keyExtractor={(item) => item.storyId}
          renderItem={({ item }) => {
            return <StoryThumbnail {...item} />
          }}
        />
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
})

export default StoriesScreenBody
