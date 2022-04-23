import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
} from "react-native"
import { CustomButton } from "../components/CustomButton"

import Colors from "../constants/Colors"

const { width, height } = Dimensions.get("window")
const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.outerHeaderSection}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar} />
          <Text style={styles.usernameStyle}>Sebastian Semeniuc</Text>
        </View>

        {/* buttons section */}
        <View style={styles.avatarSectionButtons}>
          <CustomButton
            title={"Edit"}
            onPress={() => console.log("Proceed to edit")}
          />
          <CustomButton
            title={"Stats"}
            onPress={() => console.log("Proceed to see stats")}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    width,
    height,
    backgroundColor: Colors.dark,
  },
  outerHeaderSection: {
    width,
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameStyle: {
    fontSize: 17,
    color: "white",
    marginHorizontal: 7,
  },
  avatar: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 64,
    height: 64,
  },
  avatarSectionButtons: {
    flexDirection: "row",
  },
})

export default ProfileScreen
