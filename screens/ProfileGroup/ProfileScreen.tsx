import { View, FlatList, StyleSheet, Dimensions } from "react-native"

import Colors from "../../constants/Colors"

/* Components */
import ProfileHeader from "./components/Header/Header"
import ProfilePosts from "./components/Body/ProfilePosts"

const { width, height } = Dimensions.get("window")
const ProfileScreen: React.FC = () => {
  const getHeader = () => {
    return (
      <ProfileHeader
        numberOfPosts={5}
        numberOfFollowers={120}
        numberOfFollowing={55}
      />
    )
  }
  const getBody = () => {
    return <ProfilePosts />
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={null}
        renderItem={() => null}
        ListHeaderComponent={getHeader}
        ListFooterComponent={getBody}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width,
    height,
    backgroundColor: Colors.dark,
  },
})

export default ProfileScreen
