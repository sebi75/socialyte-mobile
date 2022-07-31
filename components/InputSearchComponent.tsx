import { TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { useCallback } from "react"
/* import { getUsersSearchHistory } from "../firebase/database/search/getUserSearchHistory" */

/* REDUX */
import { useAppDispatch } from "../state/store"
import { setIsLoading } from "../state/reducers/searchUsersReducer"
import { getUsersSearchThunk } from "../state/thunks/search/getUsersSearchThunk"

interface InputSearchComponentProps {
  width: number
  autoFocus?: boolean
}

const InputSearchComponent: React.FC<InputSearchComponentProps> = ({
  width,
  autoFocus = false,
}) => {
  const dispatch: any = useAppDispatch()
  //const {users, isLoading} = useSelector((state: RootState) => state.searchUsers)
  //const { uid } = useSelector((state: RootState) => state.user)

  const debounceSearching = useCallback(
    debounce((text: string) => {
      if (text.length > 0) {
        dispatch(setIsLoading(true))
        dispatch(getUsersSearchThunk(text))
      }
    }, 1000),
    []
  )

  //TODO: notice if commenting this affects the code. It shouldn't
  /* useEffect(() => {
    getUsersSearchHistory(uid as string)
  }, []) */

  return (
    <TouchableOpacity style={[styles.discoverSearchInputStyle, { width }]}>
      <TextInput
        autoFocus={autoFocus}
        style={styles.input}
        placeholder="search for someone..."
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => debounceSearching(text)}
      />
    </TouchableOpacity>
  )
}

const debounce = (callback: (text: string) => void, wait: number) => {
  let timeoutId: any = null
  return (...args: any) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
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
