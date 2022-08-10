import React from "react"
import { StyleSheet, Dimensions, View, Image } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import { Video } from "expo-av"
import { SharedElement } from "react-navigation-shared-element"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated"
import { useVector, snapPoint } from "react-native-redash"

const AnimatedVideo = Animated.createAnimatedComponent(Video)
const { height, width } = Dimensions.get("window")

const Story = ({ route, navigation }: { route: any; navigation: any }) => {
  const { story } = route.params
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const isGestureActive = useSharedValue(false)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      isGestureActive.value = true
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX
      translateY.value = event.translationY
    },

    onEnd: (event, ctx) => {
      const goBack =
        snapPoint(translateY.value, event.velocityY, [0, height]) === height

      if (goBack) {
        runOnJS(navigation.goBack)()
      } else {
        translateX.value = withSpring(0, { velocity: event.velocityX })
        translateY.value = withSpring(0, { velocity: event.velocityY })
      }

      isGestureActive.value = false
    },
  })

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, height],
      [1, 0.1],
      Extrapolate.CLAMP
    )
    return {
      flex: 1,
      transform: [
        { translateX: translateX.value * scale },
        { translateY: translateY.value * scale },
        { scale },
      ],
    }
  })
  const rBorderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: isGestureActive.value ? Math.abs(translateY.value) : 0,
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={{ backgroundColor: "red" }} collapsable={false}>
        <SharedElement id={story.storyId} style={{ flex: 1 }}>
          {story.mediaURL && (
            <Animated.Image
              source={story.mediaURL}
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                },
                rBorderStyle,
              ]}
            />
          )}
          {/* {story.video && (
            <AnimatedVideo
              source={story.video}
              rate={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={[StyleSheet.absoluteFill, rBorderStyle]}
            />
          )} */}
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default Story
