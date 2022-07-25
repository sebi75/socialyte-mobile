import { View, StyleSheet, Dimensions, FlatList } from "react-native"
import { useEffect } from "react"
import HideKeyboard from "../../components/HideKeyboard"
import SkeletonLoading from "../../components/Skeletons/SkeletonSearch"
import UserSearchResult from "./components/UserSearchResult"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { useAppDispatch } from "../../state/store"
import { getUsersSearchHistoryThunk } from "../../state/thunks/getUsersSearchHistoryThunk"
//
//
/* this screen should render results with user profiles from searches */
//
//
const { width } = Dimensions.get("window")
const DiscoverSearchScreen: React.FC = () => {
  const { users } = useSelector((state: RootState) => state.searchUsers)
  const { uid } = useSelector((state: RootState) => state.user)
  const { historyUsers } = useSelector((state: RootState) => state.searchUsers)
  const displayUsers: any = users.length ? users : historyUsers
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!historyUsers.length) {
      dispatch(getUsersSearchHistoryThunk(uid as string))
    }
  }, [])

  return (
    <HideKeyboard>
      <View style={styles.screen}>
        <SkeletonLoading>
          <FlatList
            data={displayUsers}
            keyExtractor={(item) => item.uid}
            showsVerticalScrollIndicator={false}
            style={{ overflow: "hidden" }}
            renderItem={({ item }) => (
              <UserSearchResult
                uid={item.uid}
                username={item.username}
                imageURL={item.profilePicture}
                description={item.description}
              />
            )}
          />
        </SkeletonLoading>
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
