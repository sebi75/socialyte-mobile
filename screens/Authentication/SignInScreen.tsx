import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useReducer, useCallback, useEffect } from "react"
import { Ionicons } from "@expo/vector-icons"

import Colors from "../../constants/Colors"

import { Input } from "./components/Input"
import formReducer from "./components/reducer"
import CustomButton from "./components/CustomButton"

/* REDUX: */
import { useAppDispatch } from "../../state/store"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

import { clearError } from "../../state/reducers/authenticationReducer"
import { signInWithEmailThunk } from "../../state/thunks/authentication/signInWithEmailThunk"

import { useNavigation } from "@react-navigation/native"

const FORM_UPDATE = "FORM_UPDATE"

const { width, height } = Dimensions.get("window")
const SigninScreen: React.FC = () => {
  const [formState, formDispatch] = useReducer(formReducer, initialFormState)

  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()
  const navigation: any = useNavigation()

  const signInHandler = async () => {
    try {
      if (formState?.isFormValid) {
        const response = await dispatch(
          signInWithEmailThunk({
            email: formState.inputValues.email,
            password: formState.inputValues.password,
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

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("BottomTabNavigator")
    }
  }, [])
  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      {/* FORM */}
      <View style={styles.inputContainer}>
        <Text style={styles.mainTextLabelStyle}>Sign In</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.redirectToSigninStyle}>
            Don't have an account?
          </Text>
        </TouchableOpacity>
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={24} color="red" />
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        )}
        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            color={"red"}
            style={{ marginTop: 25 }}
          />
        ) : (
          <CustomButton
            title="Sign In"
            onPress={signInHandler}
            buttonStyle={{
              width: width * 0.5,
              alignSelf: "center",
              marginTop: 25,
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
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark,
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
    email: "",
    password: "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  isFormValid: false,
}

export default SigninScreen
