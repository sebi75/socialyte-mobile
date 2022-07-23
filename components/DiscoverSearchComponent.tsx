import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native"
import { useCallback } from "react"

interface DiscoverSearchComponentProps {
  width: number
  autoFocus?: boolean
}

const DiscoverSearchComponent: React.FC<DiscoverSearchComponentProps> = ({
  width,
  autoFocus = false,
}) => {
  //we're using a debounce function to perform searches only after 1.5 seconds of typing inactivity
  const simulateSearch = useCallback(
    debounce((text: string) => {
      if (text.length > 0) {
        console.log("executing the function for:", text)
      }
    }, 1000),
    []
  )

  return (
    <TouchableOpacity style={[styles.discoverSearchInputStyle, { width }]}>
      <TextInput
        autoFocus={autoFocus}
        style={styles.input}
        placeholder="search for someone..."
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => simulateSearch(text)}
      />
    </TouchableOpacity>
  )
}

const debounce = (callback: (text: string) => void, wait: number) => {
  let timeoutId: any = null
  return (...args: any) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
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
