import React from "react"
import { StyleSheet, Dimensions, View, Image } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import { SharedElement } from "react-navigation-shared-element"

const { height, width } = Dimensions.get("window")

const Story = ({ route, navigation }: { route: any; navigation: any }) => {
  const { mediaURL, username, storyId } = route.params.story

  return (
    <View collapsable={false}>
      <SharedElement id={storyId} style={{ flex: 1 }}>
        <Image
          source={{ uri: mediaURL }}
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              width: width,
              height: height,
            },
          ]}
        />
      </SharedElement>
    </View>
  )
}

export default Story
