import { Platform } from "react-native"
import Colors from "../../../constants/Colors"

interface ProfileSettingsType {
  backgroundColor: string
  titleColor: string
}

export const ProfileSettings: ProfileSettingsType = {
  backgroundColor: Platform.OS === "ios" ? Colors.dark : Colors.dark,
  titleColor: "white",
}
