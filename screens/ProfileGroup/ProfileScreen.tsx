import { View, FlatList, StyleSheet, Dimensions } from "react-native"

import Colors from "../../constants/Colors"

/* Components */
import ProfileHeader from "./components/Header/Header"
import ProfilePosts from "./components/Body/ProfilePosts"
import { useEffect, useCallback } from "react"

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

  const { uid: passedUid, username, description, profilePicture } = route.params
  const { users } = useSelector((state: RootState) => state.userPosts)
  const user = useSelector((state: RootState) => state.user)
  const posts = users[passedUid]

  //conditions to check if userPosts are already in the state and if they are, don't fetch them again
  const getUserPosts = useCallback((uid: string) => {
    if (
      (passedUid == user.uid &&
        (users[user.uid as string] || users[user.uid as string] == [])) ||
      posts == []
    ) {
      return
    } else if (
      passedUid != user.uid &&
      (posts != undefined || posts != null || posts == [])
    ) {
      return
    } else {
      dispatch(getUserPostsThunk(uid))
    }
  }, [])

  useEffect(() => {
    getUserPosts(route.params.uid)
  }, [])

  const getHeader = () => {
    return (
      <ProfileHeader
        uid={passedUid}
        username={username}
        photoURL={user.uid == passedUid ? user.profilePicture : profilePicture}
        description={description}
        numberOfPosts={5}
        numberOfFollowers={115}
        numberOfFollowing={55}
      />
    )
  }
  const getBody = () => {
    return <ProfilePosts uid={passedUid} />
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
