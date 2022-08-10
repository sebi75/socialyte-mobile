import { createSharedElementStackNavigator } from "react-navigation-shared-element"

import FeedScreen from "../../../screens/Feed/FeedScreen"
import Story from "../../../screens/Feed/stories/StoryComponent"

const FeedAndStoriesStack = createSharedElementStackNavigator()

const FeedAndStoriesStackNavigator: React.FC = () => (
  <FeedAndStoriesStack.Navigator
    screenOptions={{
      presentation: "modal",
      gestureEnabled: true,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: "transparent" },
    }}
  >
    <FeedAndStoriesStack.Screen
      name="FeedScreenNested"
      component={FeedScreen}
      options={() => {
        return {
          headerShown: false,
        }
      }}
    />
    <FeedAndStoriesStack.Screen
      name="Story"
      component={Story}
      sharedElements={(route) => {
        return [route.params.story.storyId]
      }}
    />
  </FeedAndStoriesStack.Navigator>
)

export default FeedAndStoriesStackNavigator
