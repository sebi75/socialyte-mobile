import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { useReducer, useCallback, useEffect } from "react"

import Colors from "../../constants/Colors"

import { Input } from "./components/Input"
import formReducer from "./components/reducer"
import CustomButton from "./components/CustomButton"
import HideKeyboard from "../../components/HideKeyboard"
import ErrorComponent from "../../components/ErrorComponent"

/* REDUX: */
import { useAppDispatch } from "../../state/store"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"

import { clearError } from "../../state/reducers/authenticationReducer"
import { signInWithEmailThunk } from "../../state/thunks/authentication/signInWithEmailThunk"

import { useNavigation } from "@react-navigation/native"
import { User } from "../../firebase/types/User"

const FORM_UPDATE = "FORM_UPDATE"

const { width, height } = Dimensions.get("window")
const SigninScreen: React.FC = () => {
  const [formState, formDispatch] = useReducer(formReducer, initialFormState)

  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()
  const navigation: any = useNavigation()

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
    <KeyboardFunctionality>
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

        {error != undefined ? (
          <ErrorComponent errorMessage={error} />
        ) : (
          <View style={{ height: 30 }}></View>
        )}

        <SignButtonComponent
          formState={formState}
          dispatch={dispatch}
          navigation={navigation}
          isLoading={isLoading}
        />
      </View>
    </KeyboardFunctionality>
  )
}

const KeyboardFunctionality: React.FC = ({ children }) => {
  return (
    <HideKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={15}
        style={styles.screen}
      >
        {children}
      </KeyboardAvoidingView>
    </HideKeyboard>
  )
}

interface SignButtonComponentProps {
  isLoading: boolean
  formState: any
  dispatch: any
  navigation: any
}

const SignButtonComponent: React.FC<SignButtonComponentProps> = ({
  isLoading,
  formState,
  dispatch,
  navigation,
}) => {
  const signInHandler = async () => {
    try {
      if (formState?.isFormValid) {
        const response = await dispatch(
          signInWithEmailThunk({
            email: formState.inputValues.email,
            password: formState.inputValues.password,
          })
        )
        if (response.payload) {
          const userData = response.payload as User

          await AsyncStorage.setItem(
            "loggedInUser",
            JSON.stringify({ uid: userData.uid })
          )
          await AsyncStorage.setItem(userData.uid, JSON.stringify(userData))
          navigation.navigate("BottomTabNavigator")
        }
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"small"}
        color={"red"}
        style={{ marginTop: 25 }}
      />
    )
  }
  return (
    <CustomButton
      title="Sign In"
      onPress={signInHandler}
      buttonStyle={{
        width: width * 0.5,
        alignSelf: "center",
        marginTop: 25,
        backgroundColor: Colors.buttonColors.primary,
      }}
    />
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
