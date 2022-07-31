import { View, FlatList, StyleSheet, Dimensions } from "react-native"
import { useEffect } from "react"

import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../state/store"
import { getUserConnectionsThunk } from "../../../state/thunks/user-connections/getUserConnectionsThunk"

import FollowersScreenHeader from "./FollowersScreenHeader"
import FollowersScreenBody from "./FollowersScreenBody"

const { width, height } = Dimensions.get("window")
const FollowersScreen: React.FC<any> = ({
  navigation,
  route,
}: {
  navigation: any
  route: any
}) => {
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
  const getHeader = () => {
    return <FollowersScreenHeader />
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
  }, [])
  return (
    <View style={styles.screen}>
      {type == "followers" ? (
        <FlatList
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFollowersBody}
          data={null}
          renderItem={() => null}
        />
      ) : (
        <FlatList
          ListHeaderComponent={getHeader}
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
