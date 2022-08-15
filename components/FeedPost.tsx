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

import { CustomIconButton } from "./IconButton"
import { Avatar } from "react-native-paper"

import { useNavigation } from "@react-navigation/native"
import { useState } from "react"

import { useAppDispatch, RootState } from "../state/store"
import { likePostOperationThunk } from "../state/thunks/posts/likePostThunk"
import { setLikePost } from "../state/reducers/feedReducer"
import { useSelector } from "react-redux"

interface FeedPostProps {
  uid: string
  username: string
  postDescription: string
  profilePicture: string
  mediaURL: string
  createdAt: string
  postId: string
  postOwner: string
  likes: string[]
}

const { width } = Dimensions.get("window")

const FeedPost: React.FC<FeedPostProps> = (props) => {
  const {
    uid,
    username,
    postDescription,
    mediaURL,
    createdAt,
    postId,
    postOwner,
    profilePicture,
    likes,
  } = props
  const navigation: any = useNavigation()

  const isLiked = likes.includes(uid)

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
          type: "like",
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
          <AvatarPicture profilePicture={profilePicture} />
          <Text style={styles.usernameStyle}>{username}</Text>
        </TouchableOpacity>
        <View>
          <Image style={styles.postImage} source={{ uri: mediaURL }} />
        </View>
        <View style={styles.thirdLine}>
          <View>
            {isLoading ? (
              <ActivityIndicator size={"small"} color={Colors.primary} />
            ) : (
              <LikeButtonsComponent
                isLiked={isLiked}
                handleLikeButtonHandler={handleLikeButtonHandler}
              />
            )}
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
  firstLine: {
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    height: 55,
    alignItems: "center",
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
    marginVertical: 10,
  },
})

export default FeedPost
