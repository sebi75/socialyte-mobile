import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native"

const HideKeyboard: React.FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default HideKeyboard
