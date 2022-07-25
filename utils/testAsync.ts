import AsyncStorage from "@react-native-async-storage/async-storage"

export default async () => {
  const loggedInUserStringified: any = await AsyncStorage.getItem(
    "loggedInUser"
  )
  const loggedInUser = JSON.parse(loggedInUserStringified)
  console.log("loggedInUser", loggedInUser)
  const userDataStringified: any = await AsyncStorage.getItem(loggedInUser.uid)
  const userData = JSON.parse(userDataStringified)
  console.log("userData", userData)
}
