import {
  View,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native"
import { useReducer, useCallback, useState } from "react"

import Colors from "../../constants/Colors"

import { Input } from "./components/Input"
import formReducer from "./components/reducer"

const FORM_UPDATE = "FORM_UPDATE"

const { width, height } = Dimensions.get("window")
const SignupScreen: React.FC = () => {
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      username: "",
      email: "",
      password: "",
    },
    inputValidities: {
      username: false,
      email: false,
      password: false,
    },
    isFormValid: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  console.log(formState?.inputValues.username)

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      formDispatch({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputId: inputIdentifier,
      })
    },
    [formDispatch]
  )

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      {/* FORM */}
      <View>
        <Input
          id={"username"}
          label={"Username: "}
          keyboardType={"email-address"}
          required
          autoCapitalize={"none"}
          errorText={"Please enter a valid email username!"}
          initialValue={""}
          onInputChange={inputChangeHandler}
        />
        <Input
          id={"email"}
          label={"Email"}
          keyboardType={"email-address"}
          required
          email
          autoCapitalize={"none"}
          errorText={"Please enter a valid email address!"}
          initialValue={""}
          onInputChange={inputChangeHandler}
        />
        <Input
          id={"password"}
          label={"Password"}
          secureTextEntry
          required
          minLength={5}
          errorText={"Please enter a valid password!"}
          initialValue={""}
          onInputChange={inputChangeHandler}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default SignupScreen
