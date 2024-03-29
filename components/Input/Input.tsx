import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native"
import { useReducer, useEffect } from "react"

import Colors from "../../constants/Colors"

const INPUT_CHANGE = "INPUT_CHANGE"
const INPUT_BLUR = "INPUT_BLUR"

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true,
      }

    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      }
    default:
      return state
  }
}

interface InputProps {
  id: string
  initialValue: string | undefined
  label: string
  initiallyValid?: boolean
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "visible-password"
  required: boolean
  email?: boolean
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  secureTextEntry?: boolean
  errorText: string
  onInputChange: (
    inputIdentifier: string,
    inputValue: string,
    inputValidity: boolean
  ) => void
}

const { width } = Dimensions.get("window")
export const Input: React.FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  })

  const textChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isValid = true
    if (props.required && text.trim().length === 0) {
      isValid = false
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false
    }
    if (props.min != null && +text < props.min) {
      isValid = false
    }
    if (props.max != null && +text > props.max) {
      isValid = false
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid })
  }

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  const { onInputChange, id } = props

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid)
    }
  }, [inputState, onInputChange, id])

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        placeholderTextColor="#aaa"
        onBlur={lostFocusHandler}
        onChangeText={textChangeHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    marginTop: 15,
  },
  label: {
    fontWeight: "bold",
    marginVertical: 5,
    color: "rgba(255,255,255,0.85)",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 7,
    backgroundColor: "rgba(255,255,255,0.15)",
    width: width * 0.7,
    height: 40,
    color: "#fff",
  },

  errorContainer: {
    marginVertical: 5,
  },

  errorText: {
    fontSize: 14,
    color: Colors.errorColor,
  },
})
