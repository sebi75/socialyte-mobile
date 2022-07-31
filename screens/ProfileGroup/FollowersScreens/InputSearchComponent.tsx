import { TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { useState } from "react"

import { useAppDispatch, RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { setArbitrarySearchResult } from "../../../state/reducers/userConnectionsSlice"
/* 
the logic and architecture is the same as in the one where you search for users
in the discover component, but here we want do instantly filter and display them,
because we don't have to query the database for them.
*/

type HeaderType = "followers" | "following"

interface InputSearchComponentProps {
  width: number
  type: HeaderType
}

/* 
LOGIC: 
If we are here it means that we already have a list of "preview users" to display,
otherwise it means the list is empty and it is shown some message to the user.

We need to have an lifted state to keep track of the results of the search when the
user is typing and when the user's input is clear or leave the screen clean the state so the list is shown as normal in the main component.

we will render the results only when the user is typing from the parent component
*/

const InputSearchComponent: React.FC<InputSearchComponentProps> = ({
  width,
  type,
}) => {
  const [text, setText] = useState("")
  const dispatch = useAppDispatch()
  console.log("in the input component")

  const followersPreview = useSelector(
    (state: RootState) => state.userConnections.followersPreview
  )
  const followingPreview = useSelector(
    (state: RootState) => state.userConnections.followingPreview
  )

  const handleTextSearch = (text: string, type: HeaderType) => {
    setText(text)
    let filteredUsers: any

    if (type === "followers") {
      filteredUsers = followersPreview.filter((user: any) =>
        user.username.toLowerCase().startsWith(text.toLowerCase())
      )
      dispatch(setArbitrarySearchResult(filteredUsers))
    } else {
      filteredUsers = followingPreview.filter((user: any) =>
        user.username.toLowerCase().startsWith(text.toLowerCase())
      )
      dispatch(setArbitrarySearchResult(filteredUsers))
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
        onChangeText={(text) => handleTextSearch(text, type)}
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

export default InputSearchComponent
