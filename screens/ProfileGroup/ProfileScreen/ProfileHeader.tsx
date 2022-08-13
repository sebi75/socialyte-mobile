import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { Avatar } from "react-native-paper"
import { CustomButton } from "../../../components/CustomButton"

import { useNavigation } from "@react-navigation/native"
/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../../state/store"
import { useAppDispatch } from "../../../state/store"
import {
  setUnfollowUser,
  setFollowUser,
} from "../../../state/reducers/userConnectionsReducer"

/* firebase functions */
import { followUser } from "../../../firebase/database/connections/followUser"
import { unfollowUser } from "../../../firebase/database/connections/unfollowUser"

interface ProfileHeaderProps {
  uid: string
  username: string
  profilePicture: string
  description: string
  numberOfPosts: number
  navigation: any
  route: any
}

const { width, height } = Dimensions.get("window")
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  uid,
  username,
  profilePicture,
  description,
  numberOfPosts,
  navigation,
}) => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.user)
  const isUsersProfile = uid === user.uid

  const {
    followingIds,
    numberOfFollowers,
    numberOfFollowings,
    temporaryNumberOfFollowers,
    temporaryNumberOfFollowings,
  } = useSelector((state: RootState) => state.userConnections)

  const isFollowing = followingIds.includes(uid)

  return (
    <View style={styles.outerHeaderSection}>
      <View style={styles.lineOne}>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigation.navigate("EditScreen")}
        >
          {profilePicture ? (
            <Avatar.Image
              size={width * 0.15}
              source={{ uri: profilePicture }}
            />
          ) : (
            <Avatar.Image
              size={width * 0.15}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/socialyte-baas.appspot.com/o/images%2Fdefault.png?alt=media&token=703d1382-8bb7-49e2-9dd0-8c7aeb8a8f74",
              }}
            />
          )}
        </TouchableOpacity>

        <View style={styles.followingCard}>
          <FieldType type="Posts" count={numberOfPosts} />
          <FieldType
            type="Followers"
            count={
              uid != user.uid
                ? temporaryNumberOfFollowers[uid]
                : numberOfFollowers
            }
            onClick={() => navigation.push("FollowersScreen", { uid })}
          />
          <FieldType
            type="Following"
            count={
              uid != user.uid
                ? temporaryNumberOfFollowings[uid]
                : numberOfFollowings
            }
            onClick={() => navigation.push("FollowingScreen", { uid })}
          />
        </View>
      </View>

      <View style={styles.lineTwo}>
        <Text style={styles.usernameStyle}>
          {isUsersProfile ? user.username : username}
        </Text>
        <Text style={styles.bioStyle}>
          {isUsersProfile ? user.description : description}
        </Text>
      </View>

      {!isUsersProfile && (
        <View style={styles.followButtonsSection}>
          {isFollowing ? (
            <CustomButton
              title={"Unfollow"}
              onPress={() => {
                unfollowUser(user.uid as string, uid)
                dispatch(setUnfollowUser(uid))
              }}
              buttonStyle={{ backgroundColor: "rgba(255,255,255,0.25)" }}
            />
          ) : (
            <CustomButton
              title={"Follow"}
              onPress={() => {
                followUser(user.uid as string, uid)
                dispatch(setFollowUser(uid))
              }}
              buttonStyle={{ flex: 1, backgroundColor: "blue" }}
            />
          )}
          <CustomButton
            title={"Message"}
            onPress={() => console.log("clicker")}
            buttonStyle={{ backgroundColor: "rgba(255,255,255,0.1)", flex: 1 }}
            textStyle={{ color: "white" }}
          />
        </View>
      )}

      <View>
        {isUsersProfile && (
          <View style={styles.editProfileButton}>
            <CustomButton
              title={"Edit"}
              onPress={() => navigation.navigate("EditScreen")}
              buttonStyle={{
                backgroundColor: "rgba(255,255,255,0.1)",
                width: width * 0.7,
              }}
            />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  followTypeCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  outerHeaderSection: {
    width,
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
  lineOne: {
    width: width * 0.9,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lineTwo: {
    marginVertical: 10,
    marginLeft: width * 0.05,
    alignSelf: "flex-start",
  },
  usernameStyle: {
    fontSize: 17,
    color: "white",
    marginHorizontal: 7,
  },
  bioStyle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginHorizontal: 7,
    marginVertical: 5,
  },
  avatar: {
    borderRadius: 100,
    width: 48,
    height: 48,
  },
  editProfileButton: {
    marginVertical: 5,
  },
  followingCard: {
    width: width * 0.7,
    height: 55,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    borderColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 7,
  },
  followButtonsSection: {
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
})

interface FieldTypeProps {
  type: string
  count: number
  onClick?: () => void
}

const FieldType: React.FC<FieldTypeProps> = ({ type, count, onClick }) => {
  return (
    <TouchableOpacity style={styles.followTypeCard} onPress={onClick}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {count && count.toString()}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {type}
      </Text>
    </TouchableOpacity>
  )
}

export default ProfileHeader
