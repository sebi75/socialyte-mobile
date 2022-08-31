import { View, StyleSheet, Dimensions, FlatList } from "react-native"

import { useEffect, useCallback } from "react"

import Colors from "../../constants/Colors"

import { useAppDispatch, RootState } from "../../state/store"
import { getDiscoverPostsThunk } from "../../state/thunks/discover/getDiscoverPostsThunk"
import { useSelector } from "react-redux"
import DiscoverBodyComponent from "./DiscoverBodyComponent"

/* 
HERE we will bring the latest posts from the last 7 days I guess
*/

const { width, height } = Dimensions.get("window")
const MainDiscoverScreen: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const { isLoading } = useSelector((state: RootState) => state.discover)
  const { uid } = useSelector((state: RootState) => state.user)

  const getBody = useCallback(() => {
    return <DiscoverBodyComponent />
  }, [uid])

  useEffect(() => {
    dispatch(getDiscoverPostsThunk())
  }, [uid])
  return (
    <View style={styles.screen}>
      <FlatList
        numColumns={2}
        onRefresh={() => dispatch(getDiscoverPostsThunk())}
        refreshing={isLoading}
        data={null}
        ListFooterComponent={getBody}
        renderItem={() => null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    height: height,
    width: width,
    backgroundColor: Colors.dark,
  },
})

export default MainDiscoverScreen
