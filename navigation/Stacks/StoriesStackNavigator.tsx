import { createNativeStackNavigator } from "@react-navigation/native-stack"
import StoriesScreen from "../../screens/StoriesGroup/StoriesScreen"

const StoriesStack = createNativeStackNavigator()

const StoriesStackNavigator: React.FC = () => {
  return (
    <StoriesStack.Navigator>
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
    </StoriesStack.Navigator>
  )
}
export default StoriesStackNavigator
