import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"

import Colors from "../constants/Colors"
import { formatDateNow } from "../utils/timeAgo"

import { CustomIconButton } from "./IconButton"
import { Avatar } from "react-native-paper"

import { useNavigation } from "@react-navigation/native"

import { useAppDispatch, RootState } from "../state/store"
import { likePostOperationThunk } from "../state/thunks/posts/likePostThunk"
import { setLikePost } from "../state/reducers/feedReducer"
import { useSelector } from "react-redux"

interface FeedPostProps {
  uid: string
  username: string
  postDescription: string
  profilePicture: string
  numOfLikes: number
  mediaURL: string
  createdAt: number
  postId: string
  postOwner: string
  likes: string[]
}

const { width } = Dimensions.get("window")

const FeedPost: React.FC<FeedPostProps> = (props) => {
  const {
    //uid,
    username,
    postDescription,
    numOfLikes,
    mediaURL,
    createdAt,
    postId,
    postOwner,
    profilePicture,
    likes,
  } = props
  const navigation: any = useNavigation()
  const { uid } = useSelector((state: RootState) => state.user)

  let isLiked = false
  if (likes.length > 0) {
    isLiked = likes.includes(uid as string)
  }

  const timeAgo = formatDateNow(createdAt)

  const dispatch = useAppDispatch()
  const isLoading = useSelector(
    (state: RootState) => state.postsUtils.isLoading
  )

  const handleLikeButtonHandler = async (type: "like" | "unlike") => {
    if (type === "like") {
      await dispatch(
        likePostOperationThunk({
          postId,
          userId: uid as string,
          type: "like",
        })
      )
      dispatch(
        setLikePost({
          postId,
          uid: uid as string,
          type: "like",
        })
      )
    } else {
      await dispatch(
        likePostOperationThunk({
          postId,
          userId: uid as string,
          type: "unlike",
        })
      )
      dispatch(
        setLikePost({
          postId,
          uid: uid as string,
          type: "unlike",
        })
      )
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.postContainer}>
        <TouchableOpacity
          style={styles.firstLine}
          onPress={() =>
            navigation.navigate("ProfileScreen", {
              uid: postOwner,
              username: username,
              profilePicture: profilePicture,
              description: postDescription,
            })
          }
        >
          <View style={styles.firstLineLeftSide}>
            <AvatarPicture profilePicture={profilePicture} />
            <Text style={styles.usernameStyle}>{username}</Text>
          </View>
          <Text style={styles.firstLineRightSide}>
            {parseInt(timeAgo) < 0 ? "Just now" : `${timeAgo} ago`}
          </Text>
        </TouchableOpacity>
        <View>
          <Image style={styles.postImage} source={{ uri: mediaURL }} />
        </View>
        <View style={styles.thirdLine}>
          <View style={styles.numOfLikesContainerStyle}>
            {isLoading ? (
              <View
                style={{
                  width: 45,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"small"} color={Colors.primary} />
              </View>
            ) : (
              <LikeButtonsComponent
                isLiked={isLiked}
                handleLikeButtonHandler={handleLikeButtonHandler}
              />
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LikesModal", { postId: postId })
              }
            >
              <Text style={styles.numOfLikesTextStyle}>{numOfLikes} likes</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10 }}>
            <CustomIconButton
              size={25}
              iconName={"ios-chatbubbles"}
              color={"white"}
              onPress={() =>
                navigation.navigate("CommentsModal", {
                  postId: postId,
                })
              }
            />
          </View>
        </View>
        <View style={[styles.thirdLine, { marginHorizontal: 10 }]}>
          <Text style={{ color: "rgba(255,255,255, 0.5)" }}>
            {postDescription}
          </Text>
        </View>
      </View>
    </View>
  )
}

interface LikeButtonsComponentProps {
  isLiked: boolean
  handleLikeButtonHandler: (type: "like" | "unlike") => void
}

const LikeButtonsComponent: React.FC<LikeButtonsComponentProps> = ({
  isLiked,
  handleLikeButtonHandler,
}) => {
  return isLiked ? (
    <CustomIconButton
      iconName={"ios-heart"}
      size={25}
      color={Colors.errorColor}
      onPress={() => handleLikeButtonHandler("unlike")}
    />
  ) : (
    <CustomIconButton
      iconName={"ios-heart-outline"}
      size={25}
      color={"white"}
      onPress={() => handleLikeButtonHandler("like")}
    />
  )
}

const AvatarPicture: React.FC<{ profilePicture: string | null }> = ({
  profilePicture,
}) => {
  return profilePicture ? (
    <Avatar.Image
      size={40}
      source={{
        uri: profilePicture,
      }}
    />
  ) : (
    <Avatar.Image
      size={40}
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/socialyte-baas.appspot.com/o/images%2Fdefault.png?alt=media&token=703d1382-8bb7-49e2-9dd0-8c7aeb8a8f74",
      }}
    />
  )
}

const styles = StyleSheet.create({
  screen: {
    width: width,
    backgroundColor: Colors.dark,
    alignItems: "center",
  },
  postContainer: {
    width: width,
  },
  avatarImage: {
    width: 48,
    height: 48,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  postImage: {
    width: "100%",
    height: width * 0.8,
    borderRadius: 10,
  },
  usernameStyle: {
    fontSize: 15,
    color: "white",
    marginLeft: 7,
  },
  thirdLine: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  firstLine: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstLineLeftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  firstLineRightSide: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  numOfLikesContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    borderRadius: 20,
    borderColor: Colors.opWhite,
    borderWidth: 1,
  },
  numOfLikesTextStyle: {
    fontSize: 15,
    color: "white",
  },
})

export default FeedPost
