import { View, FlatList, StyleSheet, Dimensions } from "react-native"
import React, { useEffect, useCallback } from "react"

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
const FollowersScreen: React.FC<FollowersScreenProps> = React.memo(
  ({ route }) => {
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

    const getFollowersBody = useCallback(() => {
      return (
        <FollowersScreenBody
          isLoading={isContentLoading}
          data={
            user.uid != uid ? temporaryFollowersPreview[uid] : followersPreview
          }
        />
      )
    }, [temporaryFollowersPreview[uid], followersPreview, uid])
    const getFollowingBody = useCallback(() => {
      return (
        <FollowersScreenBody
          isLoading={isContentLoading}
          data={
            user.uid != uid ? temporaryFollowingPreview[uid] : followingPreview
          }
        />
      )
    }, [temporaryFollowingPreview[uid], followingPreview, uid])

    const getFollowingHeader = useCallback(() => {
      return <FollowersScreenHeader type={"following"} uid={uid} />
    }, [uid])

    const getFollowersHeader = useCallback(() => {
      return <FollowersScreenHeader type={"followers"} uid={uid} />
    }, [uid])

    useEffect(() => {
      console.log({ message: "called this useeffect" })
      if (type == "followers") {
        if (user.uid != uid) {
          if (temporaryFollowersPreview[uid] != undefined) {
            return
          } else {
            dispatch(getUserConnectionsThunk({ uid, type: "followers" }))
          }
        } else if (followersPreview.length != 0) {
          return
        } else {
          dispatch(getUserConnectionsThunk({ uid, type: "followers" }))
        }
      } else {
        if (user.uid != uid) {
          if (temporaryFollowingPreview[uid] != undefined) {
            return
          } else {
            dispatch(getUserConnectionsThunk({ uid, type: "following" }))
          }
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
)

const styles = StyleSheet.create({
  screen: {
    width: width,
    height: height,
    padding: 5,
    backgroundColor: "black",
  },
})

export default FollowersScreen
