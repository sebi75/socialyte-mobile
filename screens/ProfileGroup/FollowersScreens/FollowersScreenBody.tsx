import { FlatList, StyleSheet, View } from "react-native"
import SkeletonLoading from "../../../components/Skeletons/SkeletonSearch"
import { UserFollowArrayType } from "../../../firebase/types"
import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import UserSearchResult from "../../Discover/components/UserSearchResult"

interface FollowersScreenBody {
  isLoading: boolean
  data: UserFollowArrayType
}

const FollowersScreenBody: React.FC<FollowersScreenBody> = ({
  isLoading,
  data,
}) => {
  const arbitraryData = useSelector(
    (state: RootState) => state.userConnections.arbitrarySearch
  )
  const displayData = arbitraryData ? arbitraryData : data
  return (
    <View style={styles.screen}>
      <SkeletonLoading isLoading={isLoading}>
        <FlatList
          /* @ts-ignore */
          data={displayData}
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
      </SkeletonLoading>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default FollowersScreenBody
