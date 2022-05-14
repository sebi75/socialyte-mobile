import { View, ActivityIndicator, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAppDispatch } from "../state/store"
import Colors from "../constants/Colors"

const StartupScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation: any = useNavigation()
  const tryLogin = async () => {
    try {
      const tokenJSON = await AsyncStorage.getItem("token")

      if (!tokenJSON) {
        console.log(
          "no user found -->> naivgating to authentication stack navigator"
        )
        navigation.navigate("AuthStackNavigator")
        return
      }

      console.log("we have a token")
      const token = JSON.parse(tokenJSON)

      navigation.navigate("BottomTabNavigator")
    } catch (error) {}
  }

  useEffect(() => {
    tryLogin()
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={"large"} color={Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default StartupScreen
