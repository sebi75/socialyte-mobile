import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native"

const { width, height } = Dimensions.get("window")
const DiscoverSearchComponent: React.FC = () => {
  return (
    <View style={styles.discoverSearchInputStyle}>
      <TextInput
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
    width: width * 0.6,
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
