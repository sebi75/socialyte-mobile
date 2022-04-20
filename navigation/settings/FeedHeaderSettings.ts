import { Platform } from "react-native"
import Colors from "../../constants/Colors"

interface FeedSettingsType {
  title: string
  backgroundColor: string
  titleColor: string
}

export const FeedSettings: FeedSettingsType = {
  title: "Socialyte",
  backgroundColor: Platform.OS === "ios" ? Colors.dark : Colors.dark,
  titleColor: "white",
}
