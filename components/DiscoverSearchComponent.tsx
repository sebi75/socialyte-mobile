import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native"

import { useNavigation } from "@react-navigation/native"

interface DiscoverSearchComponentProps {
  width: number
}

const DiscoverSearchComponent: React.FC<DiscoverSearchComponentProps> = ({
  width,
}) => {
  const navigation: any = useNavigation()

  return (
    <TouchableOpacity
      style={[styles.discoverSearchInputStyle, { width }]}
      onPress={() => console.log("clicked")}
    >
      <TextInput
        style={styles.input}
        placeholder="place your search..."
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </TouchableOpacity>
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
