import { TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { useState } from "react"

import { useAppDispatch, RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { setArbitrarySearchResult } from "../../../state/reducers/userConnectionsReducer"

type HeaderType = "followers" | "following"

interface InputSearchComponentProps {
  width: number
  type: HeaderType
  uid: string
}

const InputSearchComponent: React.FC<InputSearchComponentProps> = ({
  width,
  type,
  uid,
}) => {
  const [text, setText] = useState("")
  const dispatch = useAppDispatch()

  const {
    followersPreview,
    followingPreview,
    temporaryFollowersPreview,
    temporaryFollowingPreview,
  } = useSelector((state: RootState) => state.userConnections)
  const user = useSelector((state: RootState) => state.user)

  const handleTextSearch = (type: HeaderType) => {
    return (text: string) => {
      setText(text)
      let filteredUsers: any
      if (type === "followers") {
        if (user.uid != uid) {
          filteredUsers = filterUsers(temporaryFollowersPreview, text)
        } else {
          filteredUsers = filterUsers(followersPreview, text)
        }
        dispatch(setArbitrarySearchResult(filteredUsers))
      } else {
        if (user.uid != uid) {
          filteredUsers = filterUsers(temporaryFollowingPreview, text)
        } else {
          filteredUsers = filterUsers(followingPreview, text)
        }
        dispatch(setArbitrarySearchResult(filteredUsers))
      }
    }
  }

  return (
    <TouchableOpacity style={[styles.discoverSearchInputStyle, { width }]}>
      <TextInput
        style={styles.input}
        placeholder="search for someone..."
        keyboardType="default"
        value={text}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleTextSearch(type)}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  discoverSearchInputStyle: {
    height: 35,
  },
  input: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.85)",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
  },
})

const filterUsers = (users: any, text: string) => {
  return users.filter((user: any) =>
    user.username.toLowerCase().startsWith(text.toLowerCase())
  )
}

export default InputSearchComponent
