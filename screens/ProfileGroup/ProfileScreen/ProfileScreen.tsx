import { View, FlatList, StyleSheet, Dimensions } from "react-native"

import Colors from "../../../constants/Colors"

/* Components */
import ProfileHeader from "./Header"
import ProfilePosts from "./ProfilePosts"
import { useEffect, useCallback } from "react"

/* REDUX */
import { getUserPostsThunk } from "../../../state/thunks/userPosts/getUserPostsThunk"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../state/store"
import { getUserConnectionsIdsThunk } from "../../../state/thunks/user-connections/getUserConnectionIdsThunk"
import { clearTemporaryStoredData } from "../../../state/reducers/userConnectionsReducer"

interface ProfileScreenProps {
  navigation: any
  route: any
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
    if (
      user.uid != route.params.uid &&
      (temporaryFollowersIds[passedUid] == undefined ||
        temporaryFollowingIds[passedUid] == undefined)
    ) {
      dispatch(getUserConnectionsIdsThunk(route.params.uid))
    }
    return () => {
      //clear the temporary state whenever the screen is unmounted,
      //even if it's the user's
      //dispatch(clearTemporaryStoredData())
    }
  }, [])

  const getHeader = () => {
    return (
      <ProfileHeader
        uid={passedUid}
        username={username}
        profilePicture={
          user.uid == passedUid ? user.profilePicture : profilePicture
        }
        description={description}
        numberOfPosts={1}
        navigation={navigation}
        route={route}
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

const useFucntionality = () => {}

export default ProfileScreen
