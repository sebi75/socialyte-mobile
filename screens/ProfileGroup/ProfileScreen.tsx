import { View, FlatList, StyleSheet, Dimensions } from "react-native"

import Colors from "../../constants/Colors"

/* Components */
import ProfileHeader from "./components/Header/Header"
import ProfilePosts from "./components/Body/ProfilePosts"
import { useEffect } from "react"

/* REDUX */
import { getUserPostsThunk } from "../../state/thunks/userPosts/getUserPostsThunk"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store"

interface ProfileScreenProps {
  route: any
}

const { width, height } = Dimensions.get("window")
const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  const dispatch = useDispatch()
  const uidD: string = route.params.uid
  const { users } = useSelector((state: RootState) => state.userPosts)
  const posts = users[uidD]
  console.log("users:", users)

  const getUserPosts = (uid: string) => {
    if (!posts || !posts.length) {
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
    return <ProfilePosts uid={uidD} />
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
