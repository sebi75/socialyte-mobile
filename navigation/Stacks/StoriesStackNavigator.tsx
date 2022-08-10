import { createSharedElementStackNavigator } from "react-navigation-shared-element"

import StoriesScreen from "../../screens/Stories/StoriesScreen"
import Story from "../../screens/Stories/stories/StoryComponent"

const StoriesStack = createSharedElementStackNavigator()

const StoriesStackNavigator: React.FC = () => {
  return (
    <StoriesStack.Navigator
      screenOptions={{
        presentation: "modal",
        gestureEnabled: true,
        headerShown: false,
        // cardOverlayEnabled: true,
        // cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <StoriesStack.Screen
        name="StoriesScreen"
        component={StoriesScreen}
        options={{
          title: "Stories",
          headerStyle: {
            backgroundColor: "#1e1e1e",
          },
          headerTintColor: "#fff",
        }}
      />
      <StoriesStack.Screen
        name="Story"
        component={Story}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: "#1e1e1e",
          },
          headerTintColor: "#fff",
        })}
        sharedElements={(route) => {
          return [route.params.story.storyId]
        }}
      />
    </StoriesStack.Navigator>
  )
}
export default StoriesStackNavigator
