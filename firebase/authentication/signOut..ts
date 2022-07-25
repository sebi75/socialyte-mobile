import { auth } from "../firebaseConfig"
import { signOut as signOutFirebase } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const signOut = async () => {
  try {
    await signOutFirebase(auth)
    const signedInUser: any = await AsyncStorage.getItem("loggedInUser")
    const parsedUser = JSON.parse(signedInUser)
    await AsyncStorage.removeItem(parsedUser.uid)
    await AsyncStorage.removeItem("loggedInUser")
  } catch (error) {
    console.log(error)
  }
}
