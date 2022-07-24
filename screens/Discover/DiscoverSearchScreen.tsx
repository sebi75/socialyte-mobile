import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native"

import HideKeyboard from "../../components/HideKeyboard"
import SkeletonLoading from "../../components/Skeletons/SkeletonSearch"
import UserSearchResult from "./components/UserSearchResult"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
//
//
/* this screen should render results with user profiles from searches */
//
//
const { width, height } = Dimensions.get("window")
const DiscoverSearchScreen: React.FC = (props) => {
  const { users } = useSelector((state: RootState) => state.searchUsers)
  return (
    <HideKeyboard>
      <View style={styles.screen}>
        <SkeletonLoading>
          <FlatList
            data={users}
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
