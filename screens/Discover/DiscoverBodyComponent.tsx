import { FlatList } from "react-native"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

import DiscoverPostComponent from "../../components/DiscoverPostComponent"

const DiscoverBodyComponent: React.FC = () => {
  const { posts, isLoading } = useSelector((state: RootState) => state.discover)
  const { uid } = useSelector((state: RootState) => state.user)

  return (
    <FlatList
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      refreshing={isLoading}
      data={posts}
      renderItem={({ item }) => {
        return <DiscoverPostComponent {...item} uid={uid as string} />
      }}
    />
  )
}

export default DiscoverBodyComponent
