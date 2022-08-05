import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { addToSearchHistory } from "../firebase/database/search/addToSearchHistory"
import { Avatar } from "react-native-paper"
import { CustomButton } from "./CustomButton"

/* firebase api */
import { followUser } from "../firebase/database/connections/followUser"
import { unfollowUser } from "../firebase/database/connections/unfollowUser"

/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../state/store"
import {
  setUnfollowUser,
  setFollowUser,
} from "../state/reducers/userConnectionsReducer"
import { useAppDispatch } from "../state/store"

interface UserSearchResultProps {
  addableToSearchHistory: boolean
  username: string
  profilePicture: string
  description?: string
  uid: string
}

const { width, height } = Dimensions.get("window")
const UserSearchResult: React.FC<UserSearchResultProps> = ({
  addableToSearchHistory,
  username,
  profilePicture,
  description,
  uid,
}) => {
  const dispatch = useAppDispatch()
  const navigation: any = useNavigation()
  const { uid: currentUserUid } = useSelector((state: RootState) => state.user)
  const { followingIds } = useSelector(
    (state: RootState) => state.userConnections
  )
  const isFollowing = followingIds.includes(uid)
  const handlePress = () => {
    if (addableToSearchHistory) {
      addToSearchHistory(currentUserUid as string, uid)
    }
    navigation.push("ProfileScreen", {
      uid: uid,
      username: username,
      description: description,
      profilePicture: profilePicture,
    })
  }

  return (
    <TouchableOpacity style={styles.screen} onPress={handlePress}>
      {profilePicture ? (
        <Avatar.Image
          size={48}
          source={{
            uri: profilePicture,
          }}
        />
      ) : (
        <Avatar.Image
          size={48}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/socialyte-baas.appspot.com/o/images%2Fdefault.png?alt=media&token=703d1382-8bb7-49e2-9dd0-8c7aeb8a8f74",
          }}
        />
      )}
      <View style={styles.body}>
        <Text style={styles.username}>{username}</Text>

        {isFollowing && currentUserUid != uid ? (
          <CustomButton
            title={"Unfollow"}
            buttonStyle={{ backgroundColor: "#bf4152" }}
            onPress={() => {
              dispatch(setUnfollowUser(uid))
              unfollowUser(currentUserUid as string, uid)
            }}
          />
        ) : (
          <CustomButton
            title={"Follow"}
            onPress={() => {
              dispatch(setFollowUser(uid))
              followUser(currentUserUid as string, uid)
            }}
          />
        )}
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
    width: width * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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