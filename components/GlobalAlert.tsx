import { StyleSheet, Text, View, Dimensions } from "react-native"
import { CustomIconButton } from "./IconButton"

/* REDUX */
import { useAppDispatch } from "../state/store"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"
import { setGlobalAlertData } from "../state/reducers/globalAlertReducer"

const { width } = Dimensions.get("window")
const GlobalAlert: React.FC = (): any => {
  const dispatch = useAppDispatch()
  const { isVisible, title, subtitle } = useSelector(
    (state: RootState) => state.globalAlert
  )

  return (
    <>
      {isVisible && (
        <View style={styles.absolute}>
          <View style={styles.modalElementsContainer}>
            <CloseButton
              onPress={() => {
                dispatch(
                  setGlobalAlertData({
                    isVisible: false,
                    title: "",
                    subtitle: "",
                  })
                )
              }}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 30,
              }}
            >
              <Text style={[{ fontWeight: "bold", textAlign: "center" }]}>
                {title}
              </Text>
              <View />
              <Text>{subtitle}</Text>
            </View>
            <View />
          </View>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    flex: 1,
  },
  modalElementsContainer: {
    backgroundColor: "white",
    borderColor: "rgba(0, 0, 0, 0.1)",
    flexDirection: "column",
    borderRadius: 10,
    textAlign: "center",
    width: width * 0.9,
    height: width,
  },
})

const CloseButton = ({ onPress }: { onPress: any }) => {
  return (
    <CustomIconButton
      iconName={"close"}
      color={"black"}
      size={30}
      onPress={onPress}
    />
  )
}

export default GlobalAlert
