import { View, FlatList, StyleSheet, Dimensions } from "react-native"

import Colors from "../../constants/Colors"

/* Components */
import ProfileHeader from "./components/Header/Header"
import ProfilePosts from "./components/Body/ProfilePosts"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

/* REDUX */
import { getUserPostsThunk } from "../../state/thunks/userPosts/getUserPostsThunk"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store"

interface ProfileScreenProps {
  route: any
}

const { width, height } = Dimensions.get("window")
const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  //proceed to getUserPosts and put them into the redux store
  //we are checking if there aren't any posts yet in the store
  //if there are, we don't need to fetch them again
  //const navigation = useNavigation()
  const dispatch = useDispatch()
  const userPosts = useSelector((state: RootState) => state.userPosts.posts)

  const getUserPosts = (uid: string) => {
    if (!userPosts.length) {
      dispatch(getUserPostsThunk(uid))
    }
    return
  }

  useEffect(() => {
    getUserPosts(route.params.uid)

    return () => {
      console.log("unmounting")
    }
  }, [])

  const getHeader = () => {
    return (
      <ProfileHeader
        numberOfPosts={5}
        numberOfFollowers={115}
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
        refreshing={false}
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
