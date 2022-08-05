import { View, StyleSheet } from "react-native"

import SettingItem from "./ProfileScreen/SettingItem"

import Colors from "../../constants/Colors"

import { useAppDispatch } from "../../state/store"
import { signOutThunk } from "../../state/reducers/authenticationReducer"
import { useNavigation } from "@react-navigation/native"

const SettingsModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation: any = useNavigation()

  const signOutHandler = async () => {
    try {
      await dispatch(signOutThunk())
      navigation.goBack()
      navigation.navigate("AuthStackNavigator")
    } catch (error: any) {
      throw Error(error)
    }
  }

  return (
    <View style={styles.screen}>
      <SettingItem
        iconProvider="fontawesome"
        iconName="sign-out"
        onPress={signOutHandler}
        title={"Sign Out"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
})

export default SettingsModal
