import { FlatList, Dimensions } from "react-native"
import SkeletonLoading from "../../../components/Skeletons/SkeletonSearch"
import { UserFollowArrayType } from "../../../firebase/types"
import UserSearchResult from "../../Discover/components/UserSearchResult"

interface FollowersScreenBody {
  isLoading: boolean
  data: UserFollowArrayType
}

const { width, height } = Dimensions.get("window")
const FollowersScreenBody: React.FC<FollowersScreenBody> = ({
  isLoading,
  data,
}) => {
  return (
    <SkeletonLoading isLoading={isLoading}>
      <FlatList
        data={data}
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
  )
}

export default FollowersScreenBody
