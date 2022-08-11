import { FlatList, View, Text } from "react-native"
import { UserFollowArrayType } from "../../../firebase/types"

/* COMPONENTS */
import SkeletonLoading from "../../../components/Skeletons/SkeletonSearch"
import UserSearchResult from "../../../components/UserSearchResult"

/* REDUX */
import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"

interface FollowersScreenBody {
  isLoading: boolean
  data: UserFollowArrayType
}

const FollowersScreenBody: React.FC<FollowersScreenBody> = ({
  isLoading,
  data,
}) => {
  const { arbitrarySearch: arbitrarySearchData, inputSearchText } = useSelector(
    (state: RootState) => state.userConnections
  )

  const displayData = inputSearchText != "" ? arbitrarySearchData : data
  return (
    <View style={{ flex: 1 }}>
      <SkeletonLoading isLoading={isLoading}>
        {displayData ? (
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
                  addableToSearchHistory={false}
                />
              )
            }}
          />
        ) : (
          <Text>No results</Text>
        )}
      </SkeletonLoading>
    </View>
  )
}

export default FollowersScreenBody
