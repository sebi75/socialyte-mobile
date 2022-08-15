import { useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { SharedElement } from "react-navigation-shared-element"
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
} from "react-native"

import { calculateTimeAgo } from "../../../utils/timeAgo"

import { Avatar } from "react-native-paper"

const margin = 16
const borderRadius = 5
const width = Dimensions.get("window").width / 2 - margin * 2

interface StoryThumbnailProps {
  profilePicture: string
  mediaURL: string
  username: string
  storyId: string
  createdAt: number
}

const { width: screenWidth } = Dimensions.get("window")
const StoryThumbnail: React.FC<StoryThumbnailProps> = ({
  profilePicture,
  createdAt,
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

  const postedAgo = calculateTimeAgo(createdAt)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.usersInformationContainer}>
        {/* card with user info up above */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Avatar.Image
            size={width * 0.15}
            source={{
              uri: profilePicture
                ? profilePicture
                : "https://firebasestorage.googleapis.com/v0/b/socialyte-baas.appspot.com/o/images%2Fdefault.png?alt=media&token=703d1382-8bb7-49e2-9dd0-8c7aeb8a8f74",
            }}
          />
          <Text style={styles.textStyle}>{username}</Text>
        </View>

        <Text style={styles.postedAgoStyle}>{postedAgo} ago</Text>
      </View>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius,
  },

  textStyle: {
    fontSize: 15,
    color: "white",
    marginHorizontal: 5,
  },

  usersInformationContainer: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },

  mainContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  postedAgoStyle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
})

export default StoryThumbnail
