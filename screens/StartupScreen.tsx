import { View, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

/* redux */
import { useAppDispatch } from "../state/store"
import { setUser } from "../state/reducers/userSlice"

const StartupScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation: any = useNavigation()

  const tryLogin = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem("userData")

      if (!userDataJson) {
        console.log("no user found --> navigating client to authentication")
        navigation.navigate("AuthStackNavigator")
        return
      }

      const parsedUserData = JSON.parse(userDataJson)
      const { token, uid, email, username } = parsedUserData
      dispatch(setUser({ uid, email, username }))

      navigation.navigate("BottomTabNavigator")
    } catch (error) {}
  }

  useEffect(() => {
    tryLogin()
  }, [dispatch])

  return <View style={styles.screen}></View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
})

export default StartupScreen
