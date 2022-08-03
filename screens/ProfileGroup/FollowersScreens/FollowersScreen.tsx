import { View, FlatList, StyleSheet, Dimensions } from "react-native"
import { useEffect } from "react"

import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../state/store"
import { getUserConnectionsThunk } from "../../../state/thunks/user-connections/getUserConnectionsThunk"
import {
  clearTemporaryStoredData,
  setArbitrarySearchResult,
} from "../../../state/reducers/userConnectionsReducer"

import FollowersScreenHeader from "./FollowersScreenHeader"
import FollowersScreenBody from "./FollowersScreenBody"

const { width, height } = Dimensions.get("window")
const FollowersScreen: React.FC<any> = ({ route }: { route: any }) => {
  const {
    followersPreview,
    temporaryFollowersPreview,
    followingPreview,
    temporaryFollowingPreview,
  } = useSelector((state: RootState) => state.userConnections)
  const user = useSelector((state: RootState) => state.user)

  const isLoading = useSelector(
    (state: RootState) => state.userConnections.isLoading
  )
  const dispatch = useAppDispatch()

  const uid = route.params.uid
  const type = route.params.type

  const getFollowersBody = () => {
    return (
      <FollowersScreenBody
        isLoading={isLoading}
        data={user.uid != uid ? temporaryFollowersPreview : followersPreview}
      />
    )
  }
  const getFollowingBody = () => {
    return (
      <FollowersScreenBody
        isLoading={isLoading}
        data={user.uid != uid ? temporaryFollowingPreview : followingPreview}
      />
    )
  }
  const getFollowingHeader = () => {
    return <FollowersScreenHeader type={"following"} />
  }
  const getFollowersHeader = () => {
    return <FollowersScreenHeader type={"followers"} />
  }

  useEffect(() => {
    //get the users preview: followers / following
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
    //clean the arbitrary result so the next time the users visits the screen
    //the proper data is displayed instead of the temporary data
    return () => {
      dispatch(setArbitrarySearchResult(undefined))
      dispatch(clearTemporaryStoredData())
    }
  }, [])
  return (
    <View style={styles.screen}>
      {type == "followers" ? (
        <FlatList
          ListHeaderComponent={getFollowersHeader}
          ListFooterComponent={getFollowersBody}
          data={null}
          renderItem={() => null}
        />
      ) : (
        <FlatList
          ListHeaderComponent={getFollowingHeader}
          ListFooterComponent={getFollowingBody}
          data={null}
          renderItem={() => null}
        />
      )}
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
