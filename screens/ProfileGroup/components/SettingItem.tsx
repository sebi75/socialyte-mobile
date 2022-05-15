import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import { Ionicons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"

interface SettingItemProps {
  iconName: string
  title: string
  onPress: () => void
  iconProvider: "fontawesome" | "ionicons"
}

const SettingItem: React.FC<SettingItemProps> = ({
  iconName,
  title,
  onPress,
  iconProvider,
}) => {
  let Icon = iconProvider == "fontawesome" ? FontAwesome : Ionicons
  return (
    <TouchableOpacity style={styles.settingItemContainer} onPress={onPress}>
      <View style={styles.itemContentStyle}>
        {/* @ts-ignore */}
        <Icon name={iconName} size={35} color={"white"} />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  settingItemContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemContentStyle: {
    width: "100%",
    height: "100%",
    marginHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
  },

  textStyle: {
    color: "white",
    fontSize: 17,
    marginLeft: 10,
  },
})

export default SettingItem
