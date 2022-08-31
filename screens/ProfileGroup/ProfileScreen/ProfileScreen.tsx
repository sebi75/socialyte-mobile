import { View, FlatList, StyleSheet, Dimensions } from "react-native"

import Colors from "../../../constants/Colors"

/* Components */
import ProfileHeader from "./ProfileHeader"
import ProfilePosts from "./ProfilePosts"
import { useEffect, useCallback } from "react"

/* REDUX */
import { getUserPostsThunk } from "../../../state/thunks/posts/getUserPostsThunk"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../state/store"
import { getUserConnectionsIdsThunk } from "../../../state/thunks/user-connections/getUserConnectionIdsThunk"

interface ProfileScreenProps {
  navigation: any
  route: {
    params: {
      uid: string
      username: string
      description: string
      profilePicture: string
    }
  }
}

const { width, height } = Dimensions.get("window")
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { uid: passedUid, username, description, profilePicture } = route.params
  const { temporaryFollowersIds, temporaryFollowingIds } = useSelector(
    (state: RootState) => state.userConnections
  )
  const { users } = useSelector((state: RootState) => state.userPosts)
  const user = useSelector((state: RootState) => state.user)
  const posts = users[passedUid]

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

  const getHeader = useCallback(() => {
    return (
      <ProfileHeader
        uid={passedUid}
        username={username}
        profilePicture={
          user.uid == passedUid
            ? (user.profilePicture as string)
            : profilePicture
        }
        description={description}
        numberOfPosts={1}
        navigation={navigation}
        route={route}
      />
    )
  }, [
    passedUid,
    username,
    description,
    profilePicture,
    user.uid,
    user.profilePicture,
  ])

  const getBody = useCallback(() => {
    return <ProfilePosts uid={passedUid} />
  }, [passedUid])

  useEffect(() => {
    getUserPosts(route.params.uid)
    if (
      user.uid != route.params.uid &&
      (temporaryFollowersIds[passedUid] == undefined ||
        temporaryFollowingIds[passedUid] == undefined)
    ) {
      dispatch(getUserConnectionsIdsThunk(route.params.uid))
    }
  }, [])

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
