import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { addToSearchHistory } from "../../../firebase/database/search/addToSearchHistory"
import { useSelector } from "react-redux"
import { RootState } from "../../../state/store"

interface UserSearchResultProps {
  username: string
  imageURL: string
  description?: string
  uid: string
}

const { width, height } = Dimensions.get("window")
const UserSearchResult: React.FC<UserSearchResultProps> = ({
  username,
  imageURL,
  description,
  uid,
}) => {
  const navigation: any = useNavigation()
  const passName = username || "Sebastian Semeniuc"
  const currentUserUid = useSelector((state: RootState) => state.user.uid)

  const handlePress = () => {
    addToSearchHistory(currentUserUid as string, uid)
    navigation.navigate("ProfileScreenSearched", {
      uid: uid,
      username: passName,
    })
  }

  return (
    <TouchableOpacity style={styles.screen} onPress={handlePress}>
      <View style={styles.avatar} />
      <View style={styles.body}>
        <Text style={styles.username}>{username}</Text>
        {/* {description && description.length > 1 && (
          <Text style={styles.description}>{description}</Text>
        )} */}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 3,
    width: width * 0.95,
    height: height * 0.08,
    borderColor: "rgba(255, 255, 255, 0.35)",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    padding: 10,
    overflow: "hidden",
  },
  avatar: {
    backgroundColor: "white",
    borderRadius: 100,
    width: 48,
    height: 48,
  },
  body: {
    width: width * 0.7,
    justifyContent: "center",
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 7,
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 7,
    marginVertical: 5,
  },
})

export default UserSearchResult
