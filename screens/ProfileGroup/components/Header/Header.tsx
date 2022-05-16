import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native"
import FollowButton from "./FollowButton"
import { CustomButton } from "../../../../components/CustomButton"

import { useNavigation } from "@react-navigation/native"

interface ProfileHeaderProps {
  numberOfPosts: number
  numberOfFollowers: number
  numberOfFollowing: number
}

const { width, height } = Dimensions.get("window")
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  numberOfFollowers,
  numberOfFollowing,
  numberOfPosts,
}) => {
  const navigation: any = useNavigation()

  return (
    <View style={styles.outerHeaderSection}>
      <View style={styles.lineOne}>
        <View style={styles.avatar} />

        {/* FOLLOWERS & FOLLOWING display */}
        <View style={styles.followingCard}>
          <FollowType type="Posts" count={numberOfPosts} />
          <FollowType type="Followers" count={numberOfFollowers} />
          <FollowType type="Following" count={numberOfFollowing} />
        </View>
      </View>

      <View style={styles.lineTwo}>
        {/* USERNAME */}
        <Text style={styles.usernameStyle}>Sebastian Semeniuc</Text>
        {/* BIO */}
        <Text style={styles.bioStyle}>
          I am a software developer based in Bucharest, Romania.
        </Text>
      </View>

      {/* FOLLOW BUTTONS */}
      <View style={styles.followButtonsSection}>
        <FollowButton
          title={"Follow"}
          onPress={() => console.log("clicker")}
          buttonStyle={{ flex: 1 }}
        />
        <FollowButton
          title={"Message"}
          onPress={() => console.log("clicker")}
          buttonStyle={{ backgroundColor: "rgba(255,255,255,0.5)", flex: 1 }}
          textStyle={{ color: "rgba(0,0,0,0.4)" }}
        />
      </View>

      <View>
        {/* buttons section */}
        <View style={styles.editProfileButton}>
          <CustomButton
            title={"Edit"}
            onPress={() => navigation.navigate("EditScreen")}
          />
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lineTwo: {
    marginVertical: 10,
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
    backgroundColor: "white",
    borderRadius: 100,
    width: 64,
    height: 64,
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
}

const FollowType: React.FC<FollowTypeProps> = ({ type, count }) => {
  return (
    <TouchableOpacity style={styles.followTypeCard}>
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
