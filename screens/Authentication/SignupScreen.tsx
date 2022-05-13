import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native"
import { useReducer, useCallback, useState } from "react"

import Colors from "../../constants/Colors"

import { Input } from "./components/Input"
import formReducer from "./components/reducer"
import CustomButton from "./components/CustomButton"
import { useAppDispatch } from "../../state/store"

import { signUpWithEmailThunk } from "../../state/reducers/authenticationReducer"

const FORM_UPDATE = "FORM_UPDATE"

const { width, height } = Dimensions.get("window")
const SignupScreen: React.FC = () => {
  const [formState, formDispatch] = useReducer(formReducer, initialFormState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useAppDispatch()

  const signupHandler = async () => {
    console.log("started in signupHandler: -->")
    try {
      if (formState?.isFormValid) {
        dispatch(
          signUpWithEmailThunk({
            email: formState.inputValues.email,
            password: formState.inputValues.password,
          })
        )
      }
    } catch (error) {}
  }

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
      <View style={styles.inputContainer}>
        <Text style={styles.mainTextLabelStyle}>Signup</Text>
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
        <View>
          <Text style={styles.redirectToSigninStyle}>
            Already have an account?
          </Text>
        </View>
        <CustomButton
          title="Signup"
          onPress={signupHandler}
          buttonStyle={{
            width: width * 0.5,
            alignSelf: "center",
            marginTop: 15,
          }}
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
  inputContainer: {
    width: width * 0.8,
    height: "auto",
  },
  mainTextLabelStyle: {
    fontSize: 31,
    fontWeight: "bold",
    color: Colors.primary,
  },
  redirectToSigninStyle: {
    fontSize: 13,
    textDecorationLine: "underline",
    marginTop: 10,
    color: Colors.primary,
  },
})

const initialFormState = {
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
}

export default SignupScreen
