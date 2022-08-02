import { View, FlatList, StyleSheet, Dimensions } from "react-native"
import { useEffect } from "react"

import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../state/store"
import { getUserConnectionsThunk } from "../../../state/thunks/user-connections/getUserConnectionsThunk"
import { setArbitrarySearchResult } from "../../../state/reducers/userConnectionsReducer"

import FollowersScreenHeader from "./FollowersScreenHeader"
import FollowersScreenBody from "./FollowersScreenBody"

const { width, height } = Dimensions.get("window")
const FollowersScreen: React.FC<any> = ({ route }: { route: any }) => {
  const followersPreview = useSelector(
    (state: RootState) => state.userConnections.followersPreview
  )

  const isLoading = useSelector(
    (state: RootState) => state.userConnections.isLoading
  )
  const followingPreview = useSelector(
    (state: RootState) => state.userConnections.followingPreview
  )
  const dispatch = useAppDispatch()

  const uid = route.params.uid
  const type = route.params.type

  const getFollowersBody = () => {
    return <FollowersScreenBody isLoading={isLoading} data={followersPreview} />
  }
  const getFollowingBody = () => {
    return <FollowersScreenBody isLoading={isLoading} data={followingPreview} />
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
      //the way it is set up right now, when we want to see
      //what people another user is following or followed by,
      //we would put their data in the user's state
      //so we need to check if we are looking for another user and
      //have that data in a temporary state
      dispatch(getUserConnectionsThunk({ uid, type: "followers" }))
    } else {
      dispatch(getUserConnectionsThunk({ uid, type: "following" }))
    }
    //clean the arbitrary result so the next time the users visits the screen
    //the proper data is displayed instead of the temporary data
    return () => {
      dispatch(setArbitrarySearchResult(undefined))
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
