import { View, StyleSheet, Dimensions, Text, TextInput } from "react-native"
import Colors from "../../constants/Colors"
import { useState } from "react"

import { useAppDispatch } from "../../state/store"
import { setCaption } from "../../state/reducers/createPostReducer"

import { useSelector } from "react-redux"

const { width, height } = Dimensions.get("window")
const SecondScreen: React.FC = () => {
  const dispatch = useAppDispatch()

  const { caption } = useSelector((state: any) => state.postData)
  console.log(caption)

  const handleCaptionChange = (text: string) => {
    dispatch(setCaption(text))
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
          placeholder="set a description..."
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
