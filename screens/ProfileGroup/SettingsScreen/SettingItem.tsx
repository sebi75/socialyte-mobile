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
        <Icon name={iconName} size={27} color={"white"} />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  settingItemContainer: {
    width: "100%",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemContentStyle: {
    paddingHorizontal: 10,
    width: "90%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 7,
  },

  textStyle: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
  },
})

export default SettingItem
