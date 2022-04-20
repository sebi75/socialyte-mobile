import { View, FlatList } from "react-native"
import FeedPost from "../components/FeedPost"
import tw from "twrnc"

import DUMMY from "../data/dummy"

const FeedScreen: React.FC = () => {
  return (
    <View style={tw`flex-1 items-center bg-red-500`}>
      <FlatList
        data={DUMMY}
        renderItem={({ item }) => {
          const { avatar, username, id, image } = item
          const caption = Math.random().toString(36).substring(7)
          return (
            <FeedPost
              avatarImage={avatar}
              username={username}
              caption={caption}
              imageURL={image}
            />
          )
        }}
      />
    </View>
  )
}

export default FeedScreen
