import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import { LikePreview } from "../../firebase/types"

import UserSearchResult from "../../components/UserSearchResult"
import Colors from "../../constants/Colors"

interface LikesBodyComponentProps {
  likesPreviews: LikePreview[]
  isLoading: boolean
}
const { width, height } = Dimensions.get("window")
const LikesBodyComponent: React.FC<LikesBodyComponentProps> = ({
  likesPreviews,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={likesPreviews}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => {
          return (
            <UserSearchResult
              profilePicture={item.profilePicture}
              username={item.username}
              uid={item.uid}
              showFollowButton={false}
              addableToSearchHistory={false}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: height,
    maxHeight: "auto",
    alignItems: "center",
  },
})

export default LikesBodyComponent
