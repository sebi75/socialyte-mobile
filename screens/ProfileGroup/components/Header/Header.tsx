import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import { Avatar } from "react-native-paper"
import FollowButton from "./FollowButton"
import { CustomButton } from "../../../../components/CustomButton"

import { useNavigation } from "@react-navigation/native"
/* REDUX */
import { useSelector } from "react-redux"
import { RootState } from "../../../../state/store"
import { useAppDispatch } from "../../../../state/store"
import {
  setUnfollowUser,
  setFollowUser,
} from "../../../../state/reducers/userConnectionsSlice"

/* firebase functions */
import { followUser } from "../../../../firebase/database/connections/followUser"
import { unfollowUser } from "../../../../firebase/database/connections/unfollowUser"

interface ProfileHeaderProps {
  uid: string
  username: string
  photoURL: string
  description: string
  numberOfPosts: number
}

const { width, height } = Dimensions.get("window")
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  uid,
  username,
  photoURL,
  description,
  numberOfPosts,
}) => {
  const navigation: any = useNavigation()
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.user)
  const isUsersProfile = uid === user.uid

  //check for other user profile if he's followed by the current user
  const { followersIds, followingIds } = useSelector(
    (state: RootState) => state.userConnections
  )
  const numberOfFollowers = followersIds.length
  const numberOfFollowing = followingIds.length
  console.log("followingIds: ", followingIds)

  const isFollowing = followingIds.includes(uid)

  return (
    <View style={styles.outerHeaderSection}>
      <View style={styles.lineOne}>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigation.navigate("EditScreen")}
        >
          {photoURL ? (
            <Avatar.Image size={width * 0.15} source={{ uri: photoURL }} />
          ) : (
            <Avatar.Image size={width * 0.15} source={{}} />
          )}
        </TouchableOpacity>

        {/* FOLLOWERS & FOLLOWING display */}
        <View style={styles.followingCard}>
          <FollowType type="Posts" count={numberOfPosts} />
          <FollowType
            type="Followers"
            count={numberOfFollowers}
            onClick={() => navigation.navigate("FollowersScreen", { uid })}
          />
          <FollowType
            type="Following"
            count={numberOfFollowing}
            onClick={() => navigation.navigate("FollowingScreen", { uid })}
          />
        </View>
      </View>

      <View style={styles.lineTwo}>
        {/* USERNAME */}
        <Text style={styles.usernameStyle}>
          {isUsersProfile ? user.username : username}
        </Text>
        {/* BIO */}
        <Text style={styles.bioStyle}>
          {isUsersProfile ? user.description : description}
        </Text>
      </View>

      {/* FOLLOW BUTTONS */}
      {!isUsersProfile && (
        <View style={styles.followButtonsSection}>
          {isFollowing ? (
            <FollowButton
              title={"Unfollow"}
              onPress={() => {
                unfollowUser(user.uid as string, uid)
                dispatch(setUnfollowUser(uid))
              }}
              buttonStyle={{ backgroundColor: "rgba(255,255,255,0.65)" }}
            />
          ) : (
            <FollowButton
              title={"Follow"}
              onPress={() => {
                console.log(user.uid + "is following" + uid)
                followUser(user.uid as string, uid)
                dispatch(setFollowUser(uid))
              }}
              buttonStyle={{ flex: 1 }}
            />
          )}
          <FollowButton
            title={"Message"}
            onPress={() => console.log("clicker")}
            buttonStyle={{ backgroundColor: "rgba(255,255,255,0.5)", flex: 1 }}
            textStyle={{ color: "rgba(0,0,0,0.4)" }}
          />
        </View>
      )}

      <View>
        {/* buttons section */}
        {isUsersProfile && (
          <View style={styles.editProfileButton}>
            <CustomButton
              title={"Edit"}
              onPress={() => navigation.navigate("EditScreen")}
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

interface FollowTypeProps {
  type: string
  count: number
  onClick?: () => void
}

const FollowType: React.FC<FollowTypeProps> = ({ type, count, onClick }) => {
  return (
    <TouchableOpacity style={styles.followTypeCard} onPress={onClick}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {count.toString()}
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
