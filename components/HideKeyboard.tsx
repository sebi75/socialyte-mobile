import { Keyboard, TouchableWithoutFeedback } from "react-native"

const HideKeyboard: React.FC = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    style={{ overflow: "hidden" }}
  >
    {children}
  </TouchableWithoutFeedback>
)

export default HideKeyboard
