import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native"

import Colors from "../../../constants/Colors"
import CustomButton from "../../Authentication/components/CustomButton"
import HideKeyboard from "../../../components/HideKeyboard"

const { width, height } = Dimensions.get("window")
const EditScreen: React.FC = () => {
  return (
    <HideKeyboard>
      <View style={containers.screen}>
        <View style={containers.layoutContainer}>
          {/* FIRST LINE CONTAINER */}
          <View style={containers.firstLineContainer}>
            {/* CHANGING THE PROFILE PICTURE CONTAINER */}
            <View style={containers.changePictureContainer}>
              <View style={styles.avatar} />
              <CustomButton
                title={"Change Picture"}
                onPress={() => console.log("proceed to select picture")}
                buttonStyle={{ width: 150, height: 45, marginTop: 10 }}
              />
            </View>

            {/* CHANGE THE DISPLAY NAME CONTAINER */}
            <View style={containers.changeDisplayNameContainer}>
              {/* Input label */}
              <Text style={styles.label}>Display Name:</Text>
              <TextInput
                onChangeText={(text) => console.log(text)}
                style={styles.input}
                value={"Sebastian Semeniuc"}
                placeholder={"type your display name..."}
                placeholderTextColor={"white"}
              />
            </View>
          </View>

          {/* SECOND LINE CONTAINER */}
          <View style={containers.secondLineContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              onChangeText={(text) => console.log(text)}
              style={[
                styles.input,
                {
                  height: 75,
                  textAlignVertical: "top",
                },
              ]}
              numberOfLines={5}
              placeholder={
                "eg: I am a software developer based in Cluj-Napoca, Romania"
              }
              placeholderTextColor={"white"}
              maxLength={200}
              multiline={true}
            />
          </View>
          <CustomButton
            title={"Update Profile"}
            buttonStyle={{ marginTop: 50 }}
            onPress={() => console.log("Proceed to update profile")}
          />
        </View>
      </View>
    </HideKeyboard>
  )
}
const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 72,
    height: 72,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    marginTop: 10,
    borderRadius: 7,
    width: "100%",
    height: 40,
    color: "#fff",
  },

  label: {
    fontWeight: "bold",
    marginVertical: 5,
    color: "rgba(255,255,255,0.85)",
  },
})

const containers = StyleSheet.create({
  screen: {
    width,
    alignItems: "center",
    backgroundColor: Colors.dark,
  },
  layoutContainer: {
    width: width * 0.9,
    height: "100%",
    marginTop: 25,
  },
  firstLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondLineContainer: {
    width: width * 0.9,
    marginTop: 25,
  },
  changePictureContainer: {
    width: width * 0.3,
    alignItems: "center",
  },
  changeDisplayNameContainer: {
    width: width * 0.5,
  },
})

export default EditScreen
