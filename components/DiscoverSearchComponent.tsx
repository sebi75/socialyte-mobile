import { View, TextInput, StyleSheet, Dimensions } from "react-native"

import { useNavigation } from "@react-navigation/native"

const DiscoverSearchComponent: React.FC<{ width: number }> = ({
  width,
}: {
  width: number
}) => {
  const navigation: any = useNavigation()

  return (
    <View style={[styles.discoverSearchInputStyle, { width: width }]}>
      <TextInput
        onPressIn={() => navigation.navigate("DiscoverSearchScreen")}
        style={styles.input}
        placeholder="place your search..."
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  discoverSearchInputStyle: {
    height: 35,
  },
  input: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.85)",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
  },
})

export default DiscoverSearchComponent
