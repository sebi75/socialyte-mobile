import { View, FlatList, StyleSheet, Dimensions } from "react-native"
import { useEffect } from "react"

import UserSearchResult from "../../Discover/components/UserSearchResult"
import { default as InputSearchComponent } from "../../../components/DiscoverSearchComponent"
import { ScrollView } from "react-native-gesture-handler"
import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../state/store"
import { getUserConnectionsThunk } from "../../../state/thunks/user-connections/getUserConnectionsThunk"

interface FollowersScreenProps {
  uid: string
  type: "followers" | "following"
}

const { width, height } = Dimensions.get("window")
const FollowersScreen: React.FC<FollowersScreenProps> = ({ uid, type }) => {
  const followersPreview = useSelector(
    (state: RootState) => state.userConnections.followersPreview
  )
  const followingPreview = useSelector(
    (state: RootState) => state.userConnections.followingPreview
  )
  const dispatch = useAppDispatch()

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
    <ScrollView>
      <InputSearchComponent width={width * 0.8} />
      <View style={{ marginTop: "0.7rem" }}>
        {/* we need to render the items in FlatLists */}
        {type == "followers" ? (
          <FlatList
            data={followersPreview}
            keyExtractor={(item) => item.uid}
            renderItem={(userPreview) => {
              const { uid, description, profilePicture, username } =
                userPreview.item
              return (
                <UserSearchResult
                  uid={uid}
                  description={description}
                  profilePicture={profilePicture}
                  username={username}
                />
              )
            }}
          />
        ) : (
          <FlatList
            data={followingPreview}
            keyExtractor={(item) => item.uid}
            renderItem={(userPreview) => {
              const { uid, description, profilePicture, username } =
                userPreview.item
              return (
                <UserSearchResult
                  uid={uid}
                  description={description}
                  profilePicture={profilePicture}
                  username={username}
                />
              )
            }}
          />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default FollowersScreen
