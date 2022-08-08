import { View, FlatList, StyleSheet } from "react-native"

import { useEffect } from "react"

import Colors from "../../constants/Colors"

import FeedHeaderComponent from "./FeedHeaderComponent"
import FeedBodyComponent from "./FeedBodyComponent"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

const FeedScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)

  const getFeedHeader = () => {
    return <FeedHeaderComponent />
  }
  const getFeedBody = () => {
    return <FeedBodyComponent />
  }

  useEffect(() => {
    console.log("feed screen rendered")
  }, [])

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={() => null}
        ListHeaderComponent={getFeedHeader}
        ListFooterComponent={getFeedBody}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: "center",
  },
})

export default FeedScreen
