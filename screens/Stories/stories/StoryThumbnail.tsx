import { useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { SharedElement } from "react-navigation-shared-element"
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native"

const margin = 16
const borderRadius = 5
const width = Dimensions.get("window").width / 2 - margin * 2

interface StoryThumbnailProps {
  profilePicture: string
  mediaURL: string
  username: string
  storyId: string
}

const StoryThumbnail: React.FC<StoryThumbnailProps> = ({
  profilePicture,
  mediaURL,
  storyId,
  username,
}) => {
  const [opacity, setOpacity] = useState(1)
  const navigation: any = useNavigation()

  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1)
    }
  })

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        setOpacity(0)
        navigation.navigate("Story", {
          story: {
            storyId: storyId,
            username: username,
            profilePicture: profilePicture,
            mediaURL: mediaURL,
          },
        })
      }}
    >
      <View style={[styles.container, { opacity }]}>
        <SharedElement id={storyId} style={{ flex: 1 }}>
          {/* @ts-ignore */}
          <Image source={{ uri: mediaURL }} style={styles.image} />
        </SharedElement>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    marginHorizontal: 10,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius,
  },
})

export default StoryThumbnail
