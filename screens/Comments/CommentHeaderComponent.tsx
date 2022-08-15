import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native"

import { useState } from "react"
import { CustomButton } from "../../components/CustomButton"

import { useAppDispatch } from "../../state/store"
import { addCommentThunk } from "../../state/thunks/posts/addCommentThunk"
import { setAddcomment } from "../../state/reducers/postsUtilsReducer"

import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import Colors from "../../constants/Colors"

interface CommentHeaderComponentProps {
  postId: string
  uid: string
}

const { width } = Dimensions.get("window")
const CommentHeaderComponent: React.FC<CommentHeaderComponentProps> = ({
  postId,
  uid,
}) => {
  const [text, setText] = useState("")
  const dispatch = useAppDispatch()

  const isLoading = useSelector(
    (state: RootState) => state.postsUtils.addingLoading
  )

  const handleAddComment = async () => {
    if (text.length > 0) {
      await dispatch(addCommentThunk({ comment: text, uid, postId }))
      dispatch(
        setAddcomment({
          comment: text,
          postId,
          uid,
        })
      )
    }
  }
  return (
    <View style={styles.screen}>
      <TextInput
        autoFocus
        style={styles.input}
        placeholder="add a comment..."
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="rgba(255,255,255,0.85)"
        onChangeText={(text) => setText(text)}
      />
      {isLoading ? (
        <View
          style={{
            width: width * 0.25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={Colors.primary} size={"small"} />
        </View>
      ) : (
        <CustomButton
          onPress={() => handleAddComment()}
          title={"Post"}
          buttonStyle={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          textStyle={{
            color: "white",
            fontWeight: "bold",
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    width: width,
    height: width * 0.12,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    marginVertical: 20,
    justifyContent: "space-between",
  },
  input: {
    width: width * 0.6,
    height: "100%",
    color: "rgba(255,255,255,0.85)",
  },
})

export default CommentHeaderComponent
