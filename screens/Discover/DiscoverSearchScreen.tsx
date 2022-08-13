import { View, StyleSheet, Dimensions, FlatList, Text } from "react-native"
import { useEffect } from "react"
import HideKeyboard from "../../components/HideKeyboard"
//import SkeletonLoading from "../../components/Skeletons/SkeletonSearch"
import UserSearchResult from "../../components/UserSearchResult"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { useAppDispatch } from "../../state/store"
import { getUsersSearchHistoryThunk } from "../../state/thunks/search/getUsersSearchHistoryThunk"

const { width } = Dimensions.get("window")
const DiscoverSearchScreen: React.FC = () => {
  const { users } = useSelector((state: RootState) => state.searchUsers)
  const { uid } = useSelector((state: RootState) => state.user)
  const { historyUsers, isLoading } = useSelector(
    (state: RootState) => state.searchUsers
  )
  const displayUsers: any = users.length
    ? users.filter((user: any) => user.uid !== uid)
    : historyUsers.filter((user: any) => user.uid !== uid)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!historyUsers.length) {
      dispatch(getUsersSearchHistoryThunk(uid as string))
    }
  }, [])

  return (
    <HideKeyboard>
      <View style={styles.screen}>
        {/* <SkeletonLoading isLoading={isLoading}> */}
        {displayUsers.length ? (
          <FlatList
            data={displayUsers}
            keyExtractor={(item) => item.uid}
            showsVerticalScrollIndicator={false}
            style={{ overflow: "hidden" }}
            renderItem={({ item }) => (
              <UserSearchResult
                uid={item.uid}
                username={item.username}
                profilePicture={item.profilePicture}
                description={item.description}
                addableToSearchHistory={true}
                showFollowButton={false}
              />
            )}
          />
        ) : (
          <Text>No results</Text>
        )}
        {/* </SkeletonLoading> */}
      </View>
    </HideKeyboard>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: width,
    height: "100%",
    overflow: "hidden",
    backgroundColor: "black",
  },
})

export default DiscoverSearchScreen
