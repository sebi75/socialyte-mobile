import { View, FlatList, StyleSheet, Dimensions } from "react-native"
import { useEffect } from "react"

import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../state/store"
import { getUserConnectionsThunk } from "../../../state/thunks/user-connections/getUserConnectionsThunk"
import { setArbitrarySearchResult } from "../../../state/reducers/userConnectionsReducer"

import FollowersScreenHeader from "./FollowersScreenHeader"
import FollowersScreenBody from "./FollowersScreenBody"

interface FollowersScreenProps {
  route: {
    params: {
      uid: string
      type: "followers" | "following"
    }
  }
}
const { width, height } = Dimensions.get("window")
const FollowersScreen: React.FC<FollowersScreenProps> = ({ route }) => {
  const dispatch = useAppDispatch()
  const {
    followersPreview,
    temporaryFollowersPreview,
    followingPreview,
    temporaryFollowingPreview,
    isLoading: isContentLoading,
  } = useSelector((state: RootState) => state.userConnections)
  const user = useSelector((state: RootState) => state.user)
  const { uid, type } = route.params

  const getFollowersBody = () => {
    return (
      <FollowersScreenBody
        isLoading={isContentLoading}
        data={user.uid != uid ? temporaryFollowersPreview : followersPreview}
      />
    )
  }
  const getFollowingBody = () => {
    return (
      <FollowersScreenBody
        isLoading={isContentLoading}
        data={user.uid != uid ? temporaryFollowingPreview : followingPreview}
      />
    )
  }
  const getFollowingHeader = () => {
    return <FollowersScreenHeader type={"following"} uid={uid} />
  }
  const getFollowersHeader = () => {
    return <FollowersScreenHeader type={"followers"} uid={uid} />
  }

  useEffect(() => {
    if (type == "followers") {
      if (user.uid != uid) {
        dispatch(getUserConnectionsThunk({ uid, type: "followers" }))
      } else if (followersPreview.length != 0) {
        return
      } else {
        dispatch(getUserConnectionsThunk({ uid, type: "followers" }))
      }
    } else {
      if (user.uid != uid) {
        dispatch(getUserConnectionsThunk({ uid, type: "following" }))
      } else if (followingPreview.length != 0) {
        return
      } else {
        dispatch(getUserConnectionsThunk({ uid, type: "following" }))
      }
    }
    return () => {
      dispatch(setArbitrarySearchResult([]))
    }
  }, [])
  return (
    <View style={styles.screen}>
      <FlatList
        ListHeaderComponent={
          type == "followers" ? getFollowersHeader : getFollowingHeader
        }
        ListFooterComponent={
          type == "followers" ? getFollowersBody : getFollowingBody
        }
        data={null}
        renderItem={() => null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: width,
    height: height,
    padding: 5,
    backgroundColor: "black",
  },
})

export default FollowersScreen
