import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useReducer, useCallback } from "react"
import { Ionicons } from "@expo/vector-icons"

import Colors from "../../constants/Colors"

import { Input } from "./components/Input"
import formReducer from "./components/reducer"
import CustomButton from "./components/CustomButton"

/* REDUX: */
import { useAppDispatch } from "../../state/store"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

import {
  signUpWithEmailThunk,
  clearError,
} from "../../state/reducers/authenticationReducer"
import { useNavigation } from "@react-navigation/native"

const FORM_UPDATE = "FORM_UPDATE"

//signup logic will inject uid, email and token in the async store
//next time user will be still logged in

const { width, height } = Dimensions.get("window")
const SignupScreen: React.FC = () => {
  const [formState, formDispatch] = useReducer(formReducer, initialFormState)

  const { isLoading, error } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()
  const navigation: any = useNavigation()

  const signupHandler = async () => {
    try {
      if (formState?.isFormValid) {
        const response = await dispatch(
          signUpWithEmailThunk({
            email: formState.inputValues.email,
            password: formState.inputValues.password,
            username: formState.inputValues.username,
          })
        )
        //getting the token from the returned object --> response.payload.token
        //store the token in the async storage for keeping auth state
        try {
          const validResponse: any = response.payload
          const userData = {
            token: validResponse.token,
            uid: validResponse.uid,
            email: validResponse.email,
            username: initialFormState.inputValues.username,
          }
          const jsonValue = JSON.stringify(userData)

          await AsyncStorage.setItem("userData", jsonValue)

          navigation.navigate("BottomTabNavigator")
        } catch (error) {
          console.log("failed when storing in async storage")
        }
      }
    } catch (error) {
      throw Error("Error in signing up")
    }
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      if (typeof error === "string") {
        dispatch(clearError())
      }

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
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={24} color="red" />
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        )}
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"red"} />
        ) : (
          <CustomButton
            title="Signup"
            onPress={signupHandler}
            buttonStyle={{
              width: width * 0.5,
              alignSelf: "center",
              marginTop: 15,
            }}
          />
        )}
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

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },

  errorTextStyle: {
    fontSize: 14,
    color: "red",
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
