import { Platform } from "react-native"
import Colors from "../../constants/Colors"

interface FeedSettingsType {
  title: string
  backgroundColor: string
  titleColor: string
}

export const FeedSettings: FeedSettingsType = {
  title: "Socialyte",
  backgroundColor: Platform.OS === "ios" ? "#F8F8F8" : Colors.primary,
  titleColor: Platform.OS === "ios" ? Colors.primary : "#fff",
}
