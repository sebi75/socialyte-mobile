import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native"
import Colors from "../../constants/Colors"

import { useAppDispatch } from "../../state/store"
import { setCaption } from "../../state/reducers/createPostReducer"

import { useSelector } from "react-redux"

/* component will rerender with every key press for settings the description */
/* because I used dispatch to keep al the post related data in the store and not overcomplicate things */
// I considered it will not result in any performance issues as it is a small component
const { width } = Dimensions.get("window")
const SecondScreen: React.FC = () => {
  const dispatch = useAppDispatch()

  const { caption, isLoading } = useSelector((state: any) => state.postData)

  const handleCaptionChange = (text: string) => {
    dispatch(setCaption(text))
  }

  console.log("rerendered")
  if (isLoading) {
    return (
      <View
        style={[
          styles.screen,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.setBioLabel}>Set a description</Text>

        {/*  */}
        <TextInput
          multiline
          numberOfLines={3}
          onChangeText={handleCaptionChange}
          style={styles.textInputStyle}
          value={caption != undefined ? caption : ""}
          placeholder="type your description..."
          placeholderTextColor={"rgba(255,255,255,0.5)"}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  container: {
    width: width * 0.8,
    height: width * 0.8,
    marginTop: 20,
    marginLeft: 15,
  },
  setBioLabel: {
    fontSize: 17,
    color: "white",
  },
  textInputStyle: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    color: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
})

export default SecondScreen
