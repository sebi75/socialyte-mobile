import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { addToSearchHistory } from "../../../firebase/database/search/addToSearchHistory"
import { Avatar } from "react-native-paper"
import { useSelector } from "react-redux"
import { RootState } from "../../../state/store"

interface UserSearchResultProps {
  username: string
  profilePicture: string
  description?: string
  uid: string
}

const { width, height } = Dimensions.get("window")
const UserSearchResult: React.FC<UserSearchResultProps> = ({
  username,
  profilePicture,
  description,
  uid,
}) => {
  const navigation: any = useNavigation()
  const currentUserUid = useSelector((state: RootState) => state.user.uid)

  const handlePress = () => {
    addToSearchHistory(currentUserUid as string, uid)
    navigation.navigate("ProfileScreenSearched", {
      uid: uid,
      username: username,
      description: description,
      profilePicture: profilePicture,
    })
  }

  return (
    <TouchableOpacity style={styles.screen} onPress={handlePress}>
      {profilePicture ? (
        <Avatar.Image size={48} source={{ uri: profilePicture }} />
      ) : (
        <View style={styles.avatar} />
      )}
      <View style={styles.body}>
        <Text style={styles.username}>{username}</Text>
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
